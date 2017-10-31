var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ControllerSchema = new Schema({
  controllerId:String,
  description: String,
  name: String,
  deployment:{
    type: Schema.Types.ObjectId,
    ref: 'deployment'
  },
  channel: String,
  handler: {
    type: Schema.Types.ObjectId,
    ref: 'Handler'
  },
  added: Date
})
ControllerSchema
	.virtual('url')
	.get(function () {
  return '/api/controller/' + this._id
})

// Compile model from schema
module.exports = mongoose.model('Controller', ControllerSchema)
