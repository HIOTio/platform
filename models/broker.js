var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BrokerSchema = new Schema({
  description: String,
  name: String,
  myPaths: [
      {
          in:String,
          out:String
      }
     ],
  handler: {
    type: Schema.Types.ObjectId,
    ref:"handler"
  },
  active:true,
  deployment: {
    type: Schema.Types.ObjectId,
    ref:'deployment'
  },
  added: Date,
  active: Boolean
})

BrokerSchema
	.virtual('url')
	.get(function () {
  return '/api/broker/' + this._id
})

module.exports = mongoose.model('Broker', BrokerSchema)
