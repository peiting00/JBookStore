import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route to save a book to the database
router.post("/", async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear 
        ){
            return res.status(400).send({ message: "Please fill all fields" });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    }catch(err){
        console.log(err.message);
    }
    });

// Route to get all books from the database
router.get("/", async (req, res) => {
    try{
        const books = await Book.find({});
        return res.status(200).send({
            count:books.length,
            data:books,
        });
    }catch(err){
        console.log(err.message);
        res.status(500).send({ message: "Error retrieving books" });
    }

});

// Route to get book by ID
router.get("/:id", async (req, res) => {
    try{
        
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).send(book);
    }catch(err){
        console.log(err.message);
        res.status(500).send({ message: "Error retrieving books" });
    }

});

//Route to update a book
router.put("/:id", async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear 
        ){
            return res.status(500).send({ message: "Please fill all fields for update" });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).send({ message: "Book not found" });
        }
        return res.status(200).send({ message: "Book updated successfully" });

    }catch(err){
        console.log(err.message);
        res.status(500).send({ message: "Error updating books" });
    }
});

//Route to delete a book
router.delete("/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).send({ message: "Book not found" });
        }
        return res.status(200).send({ message: "Book deleted successfully" });
    }catch(err){
        console.log(err.message);
        return res.status(500).send({ message: "Error deleting book" });
    }
});

export default router;