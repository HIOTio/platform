var mongoose = require('mongoose')
var Schema = mongoose.Schema

var GroupSchema = new Schema({
  description: String,
  added: Date,
  active: Boolean,
  is_admin: Boolean,
  is_config_admin: Boolean,
  is_billing: Boolean,
  is_reader: Boolean,
  is_cg_admin: Boolean
})
GroupSchema
	.virtual('url')
	.get(function () {
  return '/api/group/' + this._id
})

// Compile model from schema
module.exports = mongoose.model('Group', GroupSchema)
