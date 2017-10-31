var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Controller_CommandSchema = new Schema({
  description: String,
  name: String,
  id: String,
  params: [{
    type: Schema.Types.ObjectId,
    ref: 'Param'
  }]
})
Controller_CommandSchema
	.virtual('url')
	.get(function () {
  return '/api/controller_command/' + this._id
})
module.exports = mongoose.model('Controller_Command', Controller_CommandSchema)
