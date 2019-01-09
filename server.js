const express = require("express");
const PORT = process.env.PORT || 3001;
const cors = require("cors");

const app = express();
const MongoClient = require('mongodb').MongoClient;

const mongoURL = "mongodb://cmb:portfolio2019@ds117759.mlab.com:17759/cmb-studio";
const dbname = "cmb-studio";
const dbcollection = "userlist"
app.use(cors());
app.use(express.static(__dirname + '/build'));


function getDateTime() {

  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}
const mongodb = require('mongodb');
//Define a schema
// Define any API routes before this runs
app.get("/getdata", function (req, res) {
  mongodb.MongoClient.connect(mongoURL,{useNewUrlParser: true}, function (err, client) {
    let db = client.db(dbname)
    let songs = db.collection(dbcollection);
    songs.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
      client.close();
    });
  });
});

app.get("/insertdata", function (req, res) {

  var ip = require("ip");
  console.dir("connect from " + ip.address());
  let seedData = [
    {
      app_name: "CMB_Studio",
      ip: ip.address(),
      time: getDateTime()
    }
  ];


  mongodb.MongoClient.connect(mongoURL, function (err, client) {
    let db = client.db(dbname)
    let songs = db.collection(dbcollection);
    songs.insert(seedData, function (err, result) {
      res.send("ipaddress was tracekd successfully!");
    });
  });
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
