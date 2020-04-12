'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27018/GuessingGame';

// Database Name
const dbName = 'GuessingGame';
// Create a new MongoClient
const client = new MongoClient(url);

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

const schema = {
    "step":0,
    "question": ["_", "_", "_", "_"],
    "guess": ["*", "*", "*", "*"],
    "answer": [],
    "fail": 0,
    "set_left": 4,
    "index": 0,
    "guess_left":4
  }

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);
    const col = db.collection('game');
  
    app.get('/', (req, res) => {
      // Get first two documents that match the query
      col.find({}).limit(1).toArray(function(err, docs) {
        assert.equal(null, err);

        let game={};
        if(docs.length!=0){
            const step = docs[0].step
            let current_step = (step == 1 || step == 5 ? '4' : (step == 2 || step == 6 ? '3' :
          (step == 3 || step == 7 ? '2' : '1')));

          game = {
            step: docs[0].step,
            question: docs[0].question.join(" "),
            guess: docs[0].guess.join(" "),
            answer: docs[0].answer.join(" "),
            set_left: docs[0].set_left,
            guess_left: docs[0].guess_left,
            fail: docs[0].fail,
          }
        }
        else{
            game = {
                step: 0,
                question: "",
                guess: "",
                answer: "",
                set_left: 4,
                guess_left: 4,
                index:0,
                fail: 0,
              };
              console.log(game)
        }

        console.log(docs)
        res.render('home.ejs', game)
        // res.send(JSON.stringify(docs));
        // client.close();
      });
    });

    app.post('/start', (req,res)=>{
        col.insertOne(schema, (err,docs)=>{
            col.updateOne({step: 0}, {$inc: {step: 1}})
            res.redirect('/')
        })
    })

    app.post('/set_question',(req,res)=>{
        const choose = req.body.set
        col.updateOne({ question: "_" }, 
        { $set: { 'question.$': choose }, $inc: { set_left: -1} });
        res.redirect('/')
    })

    app.post('/guessing', (req, res)=>{
        const choose = req.body.set2
        col.find({}).toArray(function (err, docs) {
            const index = docs[0].index;
            // console.log(docs)
            // console.log(index)
            // console.log(choose)
            if (docs[0].question[index] == choose) {
                // console.log(docs[0].question[index])
              col.updateOne({guess: "*" }, {
                $pop: { guess: 1 },
                $push: { answer: choose },
                $inc: { index: 1, guess_left:-1 }
              });
            } 
            else { col.updateOne({guess:"*"},{ $inc: { fail: 1 } }) }
          });
          res.redirect('/')
    })

    app.post('/finish', (req,res)=>{
        col.deleteOne({guess_left:0})
        res.redirect('/')
    })


  });
  
  app.listen(PORT, HOST);
  console.log(`Running on http://${HOST}:${PORT}`);