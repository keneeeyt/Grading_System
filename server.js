const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const port = process.env.PORT || 4001

dotenv.config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

//middilwares or routes

app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/sectionRoute'));
app.use('/api', require('./routes/studentCardRoute'));

// mongodb connection
const URI = process.env.MONGO_URL

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = mongoose.connection;

db.on('error', console.error.bind(console, "error"));
db.once('open', ()=> {
    console.log("We are connected to the cloud server!")
})


app.listen(port, ()=> {
    console.log(`The server is running at port ${port}`);
})