const express = require("express");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
const app = express();

const port = 3000;
let connectionString = 
"mongodb+srv://starwarsuser:DiZxgyVRltQq3hG4@cluster0.bvzttyy.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(connectionString, {useNewUrlParser: true})
.then((client) => {
    // creates the database on mongodb
    const db = client.db("destinations");
    // creates a collection on my db, to store documents(records of information)
    const destinationsCollection = db.collection('destinations');

    // open up a port 3000 that we can connect to the server and logging server up at port #
    app.listen(port, function() {
        console.log(`Server Up :) !!!\nListening on port ${port}`);
    });

    // NEED TO LEARN MORE ABOUT ALL OF THESE app.use() methods!!!!!!!!!! I DON'T REALLY KNOW WHAT'S HAPPENING!!!
    app.use(cors());
    // allows us to read data from the form
    app.use(bodyParser.urlencoded({ extended: true }));
    // allows our server to make this public folder open to the public 
    app.use(express.static('public'));
    // allows our server to accept json data
    app.use(bodyParser.json());
    // NEED TO LEARN MORE ABOUT ALL OF THESE app.use() methods!!!!!!!!!! I DON'T REALLY KNOW WHAT'S HAPPENING!!!


    // READ
    app.get("/destinations", (req, res) => {
        // read more into the find().toArray() method, seems self explainatory but read the docs
        destinationsCollection.find().toArray()
            .then((results) => {
                res.json({message: "success", results: results});
            })
            .catch((error) => res
                .status(500)
                .json({message: "error", error: error.message}))
    })

    // CREATE
    app.post("/destinations", (req, res) => {
        // inserting the body from the request(fetch POST) call into the db collection 
        destinationsCollection.insertOne(req.body, (error, result) => {
            if(error) {
                res.status(500).json({message: "error", error: error.message})
            } else {
                res.json({message: "sucess", result: result })
            } 
        })
    })

    // UPDATE
    app.put('/destinations', (req, res) => {
        destinationsCollection.findOneAndUpdate(
            // first arg is the query you are using for the collection, this will be the primary key "id"
            { _id: ObjectId(req.body._id)},
            // 2nd arg is updating the document you found with these new values you are calling within $set:
            {
                $set: {
                    destinationName: req.body.destinationName,
                    destinationLocation: req.body.destinationLocation,
                    imageUrl: req.body.imageUrl,
                }
            },
        )
        .then((result) => {
           return res.json({message: "Sucess", result: result});
        })
        .catch((error) => console.error(error))
    })

    // DELETE
    app.delete('/destinations', (req, res) => {
        destinationsCollection.deleteOne(
          // have to call the ObjectId() function in order to convert the id into what mongdb requires 
          { _id: ObjectId(req.body.id) }
        )
          .then((result) => {
              if (result.deletedCount === 0) {
                 return res.json({message: "All the destinations have been deleted", result: result}) 
              }
            console.log("Deleted");
            return res.json({message: `Destination has been deleted`, result: result})
          })
          .catch(error => console.error(error))
      })
})
.catch((error) => console.error(error));