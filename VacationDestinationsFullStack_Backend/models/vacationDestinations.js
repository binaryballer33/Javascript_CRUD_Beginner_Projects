const mongoose = require('../db/connection');

const vacationDestinationsSchema = new mongoose.Schema({
    destinationName: {type: String, required: true},
    destinationLocation: {type: String, required: true},
    imageUrl: {type: String, required: true}
})

module.exports = mongoose.model('vacationDestinations', vacationDestinationsSchema)