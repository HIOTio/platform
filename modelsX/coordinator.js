var mongoose = require('mongoose')

var Schema = mongoose.Schema

var CoordinatorSchema = new Schema({
  coordinatorId:String,
  description: String,
  added: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },
  deployment: {
    type: Schema.Types.ObjectId,
    ref: 'Deployment',
    required: true
  },
  channels:[
    {
        channelId:String,
        description: String,
        function: String
  }
]
})

CoordinatorSchema
	.virtual('url')
	.get(function () {
  return '/api/coordinator/' + this._id
})

module.exports = mongoose.model('Coordinator', CoordinatorSchema)
