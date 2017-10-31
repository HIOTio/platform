var mongoose = require('mongoose')
var Schema = mongoose.Schema

var DeploymentSchema = new Schema({
  description: String,
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  added: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },
  deploymentType: {
    type: Schema.Types.ObjectId,
    ref: 'DeploymentType'
  },
  dtValues: String
})

DeploymentSchema
	.virtual('url')
	.get(function () {
  return '/api/deployment/' + this._id
})

module.exports = mongoose.model('Deployment', DeploymentSchema)
