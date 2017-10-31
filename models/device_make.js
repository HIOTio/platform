var mongoose = require('mongoose')
var Schema = mongoose.Schema

var DeviceMakeSchema = new Schema({
  description: String,
  added: Date
})
DeviceMakeSchema
	.virtual('url')
	.get(function () {
  return '/api/device_make/' + this._id
})

// Compile model from schema
module.exports = mongoose.model('DeviceMake', DeviceMakeSchema)
