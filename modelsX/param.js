var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ParamSchema = new Schema({
  name: String,
  value: Object,
  description: String,
  required: Boolean,
  min: Number,
  max: Number,
  default: Object

})
ParamSchema
	.virtual('url')
	.get(function () {
  return '/api/param/' + this._id
})
module.exports = mongoose.model('Param', ParamSchema)
