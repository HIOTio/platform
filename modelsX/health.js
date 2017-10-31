var mongoose = require('mongoose')
var Schema = mongoose.Schema

var HealthSchema = new Schema({
  dutyCycle: Number,
  memoryUsage: Number,
  storageUsage: Number,
  totalMemory: Number,
  totalStorage: Number,
  date: Date,
  device: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  }
})
HealthSchema
	.virtual('url')
	.get(function () {
  return '/api/health/' + this._id
})
module.exports = mongoose.model('Health', HealthSchema)
