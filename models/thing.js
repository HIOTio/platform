var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ThingSchema = new Schema({
  deviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },
  description: String,
  name: String,
  active: Boolean,
  added: Date,
  pushInterval: Number,
  aggregator: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  },
  broker: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  }
})

ThingSchema
	.virtual('url')
	.get(function () {
  return '/api/thing/' + this._id
})

// Compile model from schema
module.exports = mongoose.model('Thing', ThingSchema)
