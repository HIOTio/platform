var mongoose = require('mongoose')
var config = require('../config')
mongoose.connect(config.database)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    // we're connected!
 //   console.log("connected to MongoDB")
})
