'use strict';
const express = require('express');

const path = require('path')

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'GuessingGame';
// Create a new MongoClient
const client = new MongoClient(url);

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const col = db.collection('game');

  let gameStat={ 
    stage: 0,
    question: ["_", "_", "_", "_"],
    guessing: ["_", "_", "_", "_"],
    answer: ["_", "_", "_", "_"],
    score: 0,
    fail: 0,
    step:4
  };

  app.get('/', function (req, res) {
    res.render('home.ejs',gameStat);
  });

  app.post('/start', (req,res)=>{
    function randomAlphabet(length) {
      var result           = '';
      var characters       = 'ABCD';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    gameStat={ 
      stage: 0,
      question: [randomAlphabet(1), randomAlphabet(1), randomAlphabet(1), randomAlphabet(1)],
      guessing: ["_", "_", "_", "_"],
      answer: ["_", "_", "_", "_"],
      score: 0,
      fail: 0,
      step:4
    };
      col.insertOne(gameStat, (err,docs)=>{
        col.updateOne({stage: 0}, {$inc: {stage: 1}});
        gameStat.stage=1;
        res.redirect('/');
    });
  });

  app.post('/guess',(req,res)=>{
    const choose = req.body.alphabet
    col.updateOne({ guessing: "_" }, 
    { $set: { 'guessing.$': choose }, $inc: { step: -1} });
    for(let i=0;i<4;i++){
      if(gameStat.guessing[i]=="_"){
        gameStat.guessing[i]=choose;
        break;
      };
    };
    res.redirect('/')
  });

  app.post('/finish', (req,res)=>{
    gameStat.fail+=1;
    col.updateOne({fail: gameStat.fail-1}, {$inc: {fail: gameStat.fail}});
    for(let i=0;i<4;i++){
      if(gameStat.guessing[i]==gameStat.question[i]){
        gameStat.answer[i]=gameStat.guessing[i];
      }
    }
    gameStat.guessing=["_", "_", "_", "_"];
    let i;
    for(i=0;i<4;i++){
      if(gameStat.answer[i]!=gameStat.question[i]){
        break;
      }
    }
    if(i==4){
        gameStat.stage=2;
        gameStat.score=21-gameStat.fail;
        col.updateOne({stage: 1}, {$inc: {stage: 2}});
        col.updateOne({score: 0}, {$inc: {score: gameStat.score}});
      }
    res.redirect('/')
  });

  app.post('/home', (req,res)=>{
    gameStat.stage=0;
    res.redirect('/')
  });


  app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`)
  });
});

  app.listen(PORT, HOST);
  console.log(`Running on http://${HOST}:${PORT}`);