import express from "express";
import mongoose from "mongoose";
import { PORT, MONGO_URI } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

import cors from "cors";

const app = express();

// Allow request from Netlify frontend
const netlifyFrontendURL = "https://jbookstore.netlify.app";

// Middleware to parse the body of the request from Postman
app.use(express.json());

// For Cross Origin Resource Sharing
// Option1: Allow all origins
// app.use(cors());
// Option2: Allow specific origins
app.use(cors({
    origin: netlifyFrontendURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //credentials:true,// enable set cookie
  }));


app.use('/books', booksRoute);

mongoose
    .connect(
        process.env.MONGO_URI || MONGO_URI,
        {
            //   these are options to ensure that the connection is done properly
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, ()=> {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error");
        console.log(err);
    });


