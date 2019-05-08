// Import necessary packages
const express = require('express');
const bodyParser = require('body-parser');

// create and configure the express app
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// Database Connection Info
const MongoClient = require('mongodb').MongoClient;

// the URL we copied from earlier. Replace username and password with what you created in the initial steps
const url = 'mongodb+srv://senescub:Benescu12@pongleaderboard-jvfw6.mongodb.net/test?retryWrites=true';
let db;

// The index route
app.get('/', function(req, res) {
   res.send('Sweet Game Leaderboard API!');
});

// Connect to the database with [url]
(async () => {
   let client = await MongoClient.connect(
       url,
       { useNewUrlParser: true }
   );

   db = client.db('Players');

   app.listen(PORT, async function() {
       console.log(`Listening on Port ${PORT}`);
       if (db) {
           console.log('Database is Connected!');
       }
   });
})();

// Route to create new player
app.post('/players', async function(req, res) {
    // get information of player from POST body data
    let { username, score } = req.body;
 
    // check if the username already exists
    const alreadyExisting = await db
        .collection('players')
        .findOne({ username: username });
 
    if (alreadyExisting) {
        res.send({ status: false, msg: 'player username already exists' });
    } else {
        // create the new player
        await db.collection('players').insertOne({ username, score });
        console.log(`Created Player ${username}`);
        res.send({ status: true, msg: 'player created' });
    }
 });

app.put("/players", async function(req, res) {
     let {username, score } = req.body;

     //check if the username already exxists
     const alreadyExisting = await db 
        .collection("players")
        .findOne({username: username});

    if (alreadyExisting) {
        //update the player with username
        await db   
            .collection("players")
            .updateOne({username}, {$set: {username, score}});
        console.log('Player ${username} score updated to ${score}');
        res.send({status: true, msg: "player score updated"});
    } else {
        res.send({status: false, msg: "player username not found"});
    }
});

app.delete("/players", async function(req, res) {
    let {username, score} = req.body;

    //check if the username already exists
    const alreadyExisting = await db
        .collection("players")
        .findOne({username: username});
    
    if (alreadyExisting) {
        await db.collection("players").deleteOne({username});
        console.log('Player ${username} deleted');
        res.send({status: true, msg: "player deleted"});
    } else {
        res.send({status: false, msg: "username not found"});
    }
});

// Access the leaderboard
app.get("/players", async function(req, res) {
    // retrieve ‘lim’ from the query string info
    let { lim } = req.query;
    db.collection("players")
        .find()
        // -1 is for descending and 1 is for ascending
        .sort({ score: -1 })
        // Show only [lim] players
        .limit(Number(lim))
        .toArray(function(err, result) {
            if (err)
                res.send({ status: false, msg: "failed to retrieve players" });
            console.log(Array.from(result));
            res.send({ status: true, msg: result });
        });
 });