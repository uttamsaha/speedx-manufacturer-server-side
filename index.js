const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());
require("dotenv").config();


//DB connection

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5waco.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("DB CONNECTED");
//   client.close();
// });

async function run(){
    try{
        await client.connect();
        const toolsCollection = client.db("speedx").collection("tools");
        const reviewsCollection = client.db("speedx").collection("reviews");
        
        //getting all tools
        app.get('/tool', async(req,res) =>{
            const tools = await toolsCollection.find().toArray();
            res.send(tools);
        });

        //getting all reviews
        app.get('/review', async(req,res) => {
            const reviews = await reviewsCollection.find().toArray();
            res.send(reviews);
        })
    }
    finally{

    }
}
run().catch(console.dir);
app.get('/',(req,res) => {
    res.send("SpeedX server is running");
})

app.listen(port, (req,res) => {
    console.log('Listening to port: ',port)
})