const express = require('express');
const router = express.Router();
const vacationDestinations = require("../models/vacationDestinations");

router.get("/", async (req, res) => {
    const destinations = await vacationDestinations.find({});
    res.status(200).json({status: 200, response: destinations});
})

router.post("/", async (req, res) => {
    const createDestination = await vacationDestinations.create(req.body);
    res.status(200).json({status: 201, response: createDestination});
})

router.put("/", async (req, res) => {
    const updateDestination = await vacationDestinations.findByIdAndUpdate(req.body.id, req.body, {
        new: true
    })
    res.status(200).json({status: 200, response: updateDestination})
})

router.delete("/", async (req, res) => {
    const deleteDestination =  await vacationDestinations.findByIdAndDelete(req.body.id);
    res.status(204).json({status: 204, response: deleteDestination});
})

module.exports = router

