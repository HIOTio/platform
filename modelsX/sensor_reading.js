var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Sensor_ReadingSchema = new Schema({
  sensor_id: {
    type: Schema.Types.ObjectId,
    ref: 'Sensor'
  },
  date: {
    type: Date,
    default: Date.now
  },
  reading: Number

})
Sensor_ReadingSchema
	.virtual('url')
	.get(function () {
  return '/api/sensor_reading/' + this._id
})
module.exports = mongoose.model('Sensor_Reading', Sensor_ReadingSchema)
