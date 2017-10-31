var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Sensor_TypesSchema = new Schema({
  description: String,
  name: String,
  active: Boolean,
  added: Date,
  defaultPushInterval: Number
})
Sensor_TypesSchema
	.virtual('url')
	.get(function () {
  return '/api/sensor_types/' + this._id
})

module.exports = mongoose.model('Sensor_Types', Sensor_TypesSchema)
