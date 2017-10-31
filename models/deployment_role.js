var mongoose = require('mongoose')
var Schema = mongoose.Schema

var DeploymentRoleSchema = new Schema({
  deployment: {
    type: Schema.Types.ObjectId,
    ref: 'Deployment'
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },
  active: Boolean,
  added: {
    type: Date,
    default: Date.now
  }
})
DeploymentRoleSchema
    .virtual('url')
    .get(function () {
      return '/api/deployment_role/' + this._id
    })

module.exports = mongoose.model('DeploymentRole', DeploymentRoleSchema)
