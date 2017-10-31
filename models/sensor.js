var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SensorSchema = new Schema({
  channel: String,
  id: String,
  name: String,
  config: String, //Need to JSON parse this
  sensorId: String,
  description: String,
  handler: {
    type: Schema.Types.ObjectId,
    ref: 'Handler'
  },
  config:Object,
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  active: Boolean,
  added: Date,
  poll: Number,
  sensortype: {
    type: Schema.Types.ObjectId,
    ref: 'Sensor_Types'
  }
})
SensorSchema
	.virtual('url')
	.get(function () {
  return '/api/sensor/' + this._id
})
module.exports = mongoose.model('Sensor', SensorSchema)
