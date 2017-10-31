var mongoose = require('mongoose')

var Schema = mongoose.Schema

var PlatformSchema = new Schema({
  description: String,
  added: Date
})
PlatformSchema
	.virtual('url')
	.get(function () {
  return '/api/platform/' + this._id
})

module.exports = mongoose.model('Platform', PlatformSchema)
