var everyauth =  require('everyauth')
var express = require('express')
var app=express()
var Sequelize = require("sequelize");
app.bcrypt = require('bcrypt');
app.salt   = "haha";
app.im=require('imagemagick')
app.fs=require('fs')
app.application_root = __dirname
app.__SITE__="http://localhost:9898"
app.path = require("path")
app.mongoose = require("mongoose");
app.moment = require('moment')
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
// Squelize
app.sequelize = new Sequelize('mysql://root:1989@localhost/aaa', {
    dialect: 'mysql',    
    omitNull: true,
    define: {timestamps: false,
             syncOnAssociation: true,
    },
    sync: { force: true },
});
app.models = require("./mysql_models")(app, Sequelize);

var config=require('./config.js')(app,express,everyauth);

var constants = require("./constants");

var models = require("./models")(app.mongoose);

require('./routes')(app, models);

app.listen(9898);
console.log("Listening on port 9898");
