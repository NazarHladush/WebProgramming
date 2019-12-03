const express = require('express');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/db";
var cors = require('cors')

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
    res.send('hello')
})

app.post("/addAppeals", function(req, res){
	news_obj = req.body;
  MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db("db");
	    dbo.collection("appeals").insertOne(news_obj, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted");
	 	});
	 res.send(news_obj);
	db.close();
  });
});

app.post("/addNews", function(req, res){
	news_obj = req.body;
  MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db("db");
	    dbo.collection("news").insertOne(news_obj, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted");
	 	});
	 res.send(news_obj);
	db.close();
  });
});

app.listen(3500)