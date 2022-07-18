const mongoose = require('mongoose');
/**
 * to specify what db mongoose should use, add the name of the db after the mongodb.net/
 * if you don't then mongoose will instruct mongodb to create a new db called test
 * and create the collections you definied in the model/schema
 */
const uri = 'mongodb+srv://vacationDestinationUser:4JBGaDEpajHNwkiN@cluster0.bvzttyy.mongodb.net/vacationDestinations?retryWrites=true&w=majority'

mongoose.connect(uri,
    {useUnifiedTopology: true}, () => {
        console.log("Connected to Vacation Destinations Database!!!");
})

module.exports = mongoose
