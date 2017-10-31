var mongoose = require('mongoose')
var Schema = mongoose.Schema

var DeploymentTypeSchema = new Schema({
  name: String,
  description: String,
  useLocation: Boolean,
  locationLabel: String,
  objectString: String
})
DeploymentTypeSchema
	.virtual('url')
	.get(function () {
  return '/api/deployment_type/' + this._id
})

module.exports = mongoose.model('DeploymentType', DeploymentTypeSchema)
