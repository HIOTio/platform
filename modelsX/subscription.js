var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SubscriptionSchema = new Schema({
  topic: {
    type: Schema.Types.ObjectId,
    ref: 'topic'
  },
  added: Date,
  description: String
})
SubscriptionSchema
	.virtual('url')
	.get(function () {
  return '/api/subscription/' + this._id
})

// Compile model from schema
module.exports = mongoose.model('Subscription', SubscriptionSchema)
