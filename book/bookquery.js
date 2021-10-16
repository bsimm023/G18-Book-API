//--This sets a port for your script to run on. Pick a random number from 1024 to 49150 to set this to.--//
// If two scripts have the same port, the scripts will not work! -//
const PORT = 3300;

//--This just creates a local server for running queries on.--//
const client = require('../scripts/server.js');

const path = require("path");

const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(PORT, ()=>{
    console.log("Sever is listening on port " + PORT);
})

client.connect();
//---------------------------//

app.get("/scripts/jquery.js", (req, res) => {
    res.sendFile(path.join(__dirname, "../scripts/jquery.js"));
});

//---------------------------//

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

app.get("/book/bookdetails.php", (req, res) => {
    res.sendFile(path.join(__dirname, "bookdetails.php"));
});

app.get("/f4scripts/resize.js", (req, res) => {
    res.sendFile(path.join(__dirname, "f4scripts/resize.js"));
});

app.get("/f4scripts/accordion.js", (req, res) => {
    res.sendFile(path.join(__dirname, "f4scripts/accordion.js"));
});

app.get("/book/img/booksbg.jpg", (req, res) => {
    res.sendFile(path.join(__dirname, "img/booksbg.jpg"));
});

app.get("/book/css/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "css/style.css"));
});
//---------------------------//

app.get("/book/:book_id", (req, res) => {
    res.sendFile(path.join(__dirname, "bookdetails.php"));
});

app.get('/src', (req, res)=>
{
    client.query(`SELECT * from book`, (err, result)=>
    {
        if(!err){
            res.json(result.rows[0]);
        }
    });
    client.end;
})


app.get('/src/:book_id', (req, res)=>
{
    client.query(`SELECT * from book where book_id=${req.params.book_id}`, (err, result)=>
    {
        if(!err){
            res.json(result.rows[0]);
        }
    });
    client.end;
})

app.get('/src/:book_id/title', (req, res)=>
{
    var goal;

    client.query(`SELECT title from book where book_id=${req.params.book_id}`, (err, result)=>
    {
        if(!err){
            goal = res.json(result.rows[0]);
        }
    });
    client.end;
    module.exports = goal
})