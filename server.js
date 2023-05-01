const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('./Schemas/Users');
let bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* To stop the CORS policy errors */
const cors = require('cors');
app.use(cors());

/* Set Up Mongo Connection */
mongoose.connect('mongodb://127.0.0.1:27017/DanteDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to the MongoDB")
}).catch(err => {
    console.log("MongoDB was unable to connect\n", err)
})

/* Test Get Request */
async function test() {
    try {
        const users = await userSchema.find();
        console.log(users)
    } catch (err) {
        console.log(err)
    }
}
test();


/* User Requests */
app.get('/users', async (req, res) => {
    try {
        const users = await userSchema.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});
app.post('/users', async (req, res) => {
    console.log("hello")
    try {
        console.log("here", req.body)
        const newUser = new userSchema({
            userName: req.body.userName,
            email: req.body.email,
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            password: req.body.password
        });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

/* Bring backend up */
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});