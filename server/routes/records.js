import express from "express";

import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();


//get a list of all records.
router.get("/", async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();

    res.send(results).status(200);
});

//get a single record by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("records");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if(!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

//create new record.
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        };
        let collection = await db.collection("records");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error adding record");
    }
});

//update a record by id
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                name: req.body.name,
                position: req.body.position,
                level: req.body.level, 
            },
        };

        let collection = await db.collection("records");
        let result = await collection.updateOne(query, updates);

        res.send(result).status(200);
        
    } catch (error) {
        console.error(error.message);
        res.send("Error updating record").status(500);
    }
});


// Delete a record
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const collection = await db.collection("records");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
        
    } catch (error) {
        console.error(error.message);
        res.send("Error deleting record").status(500);
    }
})

export default router;