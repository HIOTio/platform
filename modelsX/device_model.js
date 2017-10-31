var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Device_ModelSchema = new Schema({
  description: String,
  make: {
    type: Schema.Types.ObjectId,
    ref: 'Device_Make'
  },
  added: Date
})
Device_ModelSchema
	.virtual('url')
	.get(function () {
  return '/api/device_model/' + this._id
})
module.exports = mongoose.model('DeviceModel', Device_ModelSchema)
