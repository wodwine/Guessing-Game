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
  const col = db.collection('students');

  app.get('/', function (req, res) {
    res.send('My Guessing Game')
  })

  app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`)
  })



  // app.get('/', (req, res) => {
  //   // Get first two documents that match the query
  //   col.find({}).limit(1).toArray(function(err, docs) {
  //     assert.equal(null, err);
      
  //     //CODE HERE
  //   });
  // });


});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);