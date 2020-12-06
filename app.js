const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const postRoute = require('./routers/posts');

app.use(bodyParser.json());

app.use('/posts' , postRoute)

app.get('/' , (req , res) =>{
    res.send("www");
})

mongoose.connect(
    process.env.DB_CONNECTION ,
    { useNewUrlParser: true},
    () =>{
        console.log('Connect success');
});


app.listen('3000');