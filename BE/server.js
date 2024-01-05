import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Posts from './postModel.js';
import Pusher from 'pusher';

//App Config
const app = express()
const port = process.env.PORT || 9000
const connection_url = 'mongodb+srv://DNV7:Vypro123@fb.yuylxff.mongodb.net/?retryWrites=true&w=majority'

//Middleware
app.use(express.json())
app.use(Cors())

//DB Config
const pusher = new Pusher({
    appId: "1734790",
    key: "5566f70c036fc93b2e23",
    secret: "33e375bc880f8b429c58",
    cluster: "ap1",
    useTLS: true
});
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//API Endpoints
const db = mongoose.connection
mongoose.connection.once('open', () => {
    console.log('DB Connected')
    const changeStream = mongoose.connection.collection('posts').watch()
    changeStream.on('change', change => {
        console.log(change)
        if (change.operationType === "insert") {
            console.log('Trigerring Pusher')
            pusher.trigger('posts', 'inserted', {
                change: change
            })
        } else {
            console.log('Error trigerring Pusher')
        }
    })
})
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

app.post('/upload', (req, res) => {
    const dbPost = req.body
    Posts.create(dbPost)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
})
app.get('/sync', (req, res) => {
    Posts.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
})

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))