var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TopicSchema = new Schema({
  name: String,
  added: Date,
  description: String,
  fields: [{
    field_name: String,
    description: String,
    required: Boolean,
    field_type: String
  }]
})
TopicSchema
	.virtual('url')
	.get(function () {
  return '/api/topic/' + this._id
})

// Compile model from schema
module.exports = mongoose.model('Topic', TopicSchema)
