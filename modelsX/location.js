var mongoose = require('mongoose')
var Schema = mongoose.Schema

var LocationSchema = new Schema({
  description: String,
  deployment:{
    type: Schema.Types.ObjectId,
    ref: 'Deployment'
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  added: Date
})
LocationSchema
	.virtual('url')
	.get(function () {
  return '/api/location/' + this._id
})

// Compile model from schema
module.exports = mongoose.model('Location', LocationSchema)
