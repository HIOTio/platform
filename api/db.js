var mongoose = require("mongoose")
var config = require("../config")
var bluebird = require('bluebird');
mongoose.Promise = bluebird;
mongoose.connect(config.database)
mongoose.connect(config.database, { useMongoClient: true})
.then(()=> { console.log(`Succesfully Connected to the Mongodb Database`)})
.catch(()=> { console.log(`Error Connecting to the Mongodb Database`)});

