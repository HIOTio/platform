var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PublicationSchema = new Schema({
  topic: {
    type: Schema.Types.ObjectId,
    ref: 'topic'
  },
  added: Date,
  description: String
})
PublicationSchema
	.virtual('url')
	.get(function () {
  return '/api/publication/' + this._id
})

// Compile model from schema
module.exports = mongoose.model('Publication', PublicationSchema)
