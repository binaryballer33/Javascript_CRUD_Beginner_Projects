const express = require("express");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

let connectionString = 
"mongodb+srv://starwarsuser:DiZxgyVRltQq3hG4@cluster0.bvzttyy.mongodb.net/?retryWrites=true&w=majority";
MongoClient.connect(connectionString)
.then((client) => {
    const db = client.db("StarWars-quotes");
    // creates a collection on my db, to store documents(records of information)
    const quotesCollection = db.collection('quotes');

    app.set('view engine', 'ejs');

    // open up a port 3000 that we can connect to
    app.listen(3000, function() {
        console.log("listening on 3000");
    });

    // allows us to read data from the form
    app.use(bodyParser.urlencoded({ extended: true }));
    // allows our server to make this public folder open to the public 
    app.use(express.static('public'));
    // allows our server to accept json data
    app.use(bodyParser.json());

    // read operation
    app.get("/", (req, res) => {
        // sends result back to this url, before you have a ejs you need this
        // res.sendFile(__dirname + "/index.html");

        // // contains all quotes from our db, won't make sense to log this
        // const cursor = db.collection('quotes').find();
        // console.log(cursor);
        db.collection('quotes').find().toArray()
        .then((results) => {
            res.render('index.ejs', { quotes: results })
        })
        .catch((error) => console.error(error))
    })

    // create operation
    app.post("/quotes", (req, res) => {
        quotesCollection.insertOne(req.body)
        .then((result) => {
            // redirects user back to specified url "/" after submitting their data
            res.redirect('/');
        })
        .catch((error) => console.error(error))
    })

    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
            {name: 'Shaquille Mandy'},
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote
                }
            },
            {
                upsert: true
            }
        )
        .then((result) => {
           res.json("Sucess");
        })
        .catch((error) => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
          { name: req.body.name }
        )
          .then(result => {
              if (result.deletedCount === 0) {
                 return res.json("No quote to delete") 
              }
            res.json(`Deleted Shaquille Mandy's quote`)
          })
          .catch(error => console.error(error))
      })
})
.catch((error) => console.error(error));