var everyauth =  require('everyauth')
var express = require('express')
var app=express()
app.bcrypt = require('bcrypt')
app.im=require('imagemagick')
app.fs=require('fs')
app.application_root = __dirname
app.__SITE__="http://localhost:3000"
app.path = require("path")
app.mongoose = require("mongoose")
app.moment = require('moment')

// Redis setup
app.redis = require('redis');
app.redis_client = app.redis.createClient();
app.redis_client.on("error", function (err) {
        console.log("Error " + err);
});

// Puser API setup
var Pusher = require('pusher');
app.pusher = new Pusher({
  appId: '57457',
  key: '5d619a48dbd0465163f0',
  secret: '3ae7459db7282cc4c6cf'
});

// Moment setip
app.moment.relativeTime={
    future: "in %s",
    past: "%s ago",
    s:"1 second",
    ss: "%d seconds",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years"
}

// Include config file
var config=require('./config.js')(app,express,everyauth);

// Include constants file
var constants = require("./constants");

// Include models file
var models = require("./models")(app.mongoose);

// Include the controller file
require('./routes')(app, models);

// Start server
app.listen(9898);
console.log("Listening on port 9898");
