import express from 'express';
import { MongoClient } from 'mongodb';
const app = express();
import cors from 'cors';

// app.use('/', (req, res, next) => {
//     console.log('Request URL: ' + req.url);
//     next(); // go to the next middleware for this route
// })

app.use(express.static('src'))
app.use(express.json());
app.use(cors({origin: '*'}));

const url=`mongodb+srv://christmas:FunnyPW3@clusterfun.4uj41.mongodb.net/`;
const dbconnect= new MongoClient(url);
let hero_collection= null;
let user_collection= null;

async function run() {
    await dbconnect.connect()
    console.log("Connected!");
    hero_collection = await dbconnect.db("MobileLegends").collection("Heroes");
    //console.log(hero_collection);
    //console.log(hero_collection);
    user_collection = await dbconnect.db("MobileLegends").collection("Users");
    //console.log(user_collection);

    app.get('/', (req, res) => {
        res.send("public/index.html");
    })

    app.get('/results', async (req, res) => {
        const results = await hero_collection.find({}).toArray();
        console.log(results);
        let body = `<html lang="en"><body><h1>Hero Data</h1>${JSON.stringify(results)}</body></html>`;
        res.send(body);
    })

    app.post('/load-table', async (req, res) => {
        console.log("In /load-table");
        let dataString = ""

        req.on( "data", function( data ) {
            dataString += data
        })

        req.on( "end", async () => {
            let user = JSON.parse(dataString);
            // const user = req.body;

            if (!user) {
                return res.status(400).json({ error: "user not found" });
            }

            const hero_data = await hero_collection.find({"username": user.username}, {projection: {username: 0, _id: 0}}).toArray();
            console.log(hero_data);
            res.send(JSON.stringify(hero_data));
        })
    })

    app.get('/:filename', (req, res) => {
        res.sendFile("public/req.params.filename");
    })

    app.post('/login', async (req, res) => {
        let dataString = "";

        req.on("data", function (data){
            dataString += data;
        });

        req.on("end", async () => {
            let userauth = JSON.parse(dataString);
            const user = await user_collection.findOne({"username": userauth.username, "password": userauth.password}, {projection: {"_id": 0, "username": 1}});
            res.send(JSON.stringify(user));
        })
    })

    app.post('/add', async (req, res) => {
        let dataString = ""

        req.on( "data", function( data ) {
            dataString += data
        })

        req.on( "end", async function() {
            console.log( JSON.parse( dataString ) )
            let new_dude = JSON.parse( dataString )
            let results;

            //const in_database = hero_collection.findOne( x => x.name.toUpperCase() === new_dude.name.toUpperCase() );
            const in_database = await hero_collection.findOne({"name": new_dude.name});
            console.log(new_dude);
            console.log(in_database);
            if(in_database === null){
                await hero_collection.insertOne({"name": new_dude.name, "type": new_dude.type, "role": new_dude.role, "username": new_dude.username});
            } else {
                //appdata[in_database] = new_dude
                await hero_collection.updateOne({name: new_dude.name}, {$set:{type: new_dude.type, username: new_dude.username}});
                await hero_collection.updateOne({name: new_dude.name}, {$set:{role: new_dude.role}});
            }

            results = await hero_collection.find({username: new_dude.username}, {projection: {username: 0, _id: 0}}).toArray();
            //res.writeHead( 200, "OK", {"Content-Type": "text/plain" })
            res.end( JSON.stringify( results ) )
        })
    })

    // app.post('/login', async (req, res) => {
    //
    // })

    app.post('/delete_all', async (req, res) => {
        let dataString = ""

        req.on( "data", function( data ) {
            dataString += data
        })

        req.on( "end", async function() {
            let results;

            let user = JSON.parse(dataString);

            results = await hero_collection.deleteMany({username: user.username}, {projection: {username: 0, _id: 0}});
            res.end( JSON.stringify( results ) )
        })
    })

    app.post('/delete', async (req, res) => {
        let dataString = ""

        req.on( "data", function( data ) {
            dataString += data
        })

        req.on( "end", async function() {
            console.log(JSON.parse(dataString))
            let new_dude = JSON.parse(dataString)
            let results;


            const in_database = await hero_collection.findOne({"name": new_dude.name, username: new_dude.username});

            console.log(in_database);
            console.log(dataString);
            if (in_database !== null){
                await hero_collection.deleteOne({"name": new_dude.name, "username": new_dude.username});
            }
            results = await hero_collection.find({username: new_dude.username}, {projection: {username: 0, _id: 0}}).toArray();
            //res.writeHead( 200, "OK", {"Content-Type": "text/plain" })
            res.end( JSON.stringify( results ) )
        })
    })
}

const appRun = run();

app.listen(process.env.PORT || 3000);