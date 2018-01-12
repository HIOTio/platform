var mongoose = require("mongoose")
var config = require("../config")
var debug=require("debug")("api/db.js");
var bluebird = require("bluebird");
mongoose.Promise = bluebird;
mongoose.connect(config.database, { useMongoClient: true})
.then(() => { debug(`Succesfully Connected to the Mongodb Database`)})
.catch(() => { debug(`Error Connecting to the Mongodb Database`)});

