var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Device_ConfigurationSchema = new Schema({
  description: String,
  added: Date,
  ip_address: String
})
Device_ConfigurationSchema
	.virtual('url')
	.get(function () {
  return '/api/device_configuration/' + this._id
})

// Compile model from schema
module.exports = mongoose.model('Device_Configuration', Device_ConfigurationSchema)
