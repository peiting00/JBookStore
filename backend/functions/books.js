import serverless from "serverless-http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import booksRoute from "../routes/booksRoute.js";
import { MONGO_URI } from "../config.js";

const app = express();

// Allow request from Netlify frontend
const netlifyFrontendURL = "https://jbookstore.netlify.app";

// Middleware to parse the body of the request
app.use(express.json());

// For Cross Origin Resource Sharing
app.use(cors({
    origin: netlifyFrontendURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use('/.netlify/functions/books', booksRoute);

mongoose
    .connect(
        process.env.MONGO_URI || MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection error");
        console.log(err);
    });

export const handler = serverless(app);
