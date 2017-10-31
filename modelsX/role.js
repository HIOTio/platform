var mongoose = require('mongoose')
var Schema = mongoose.Schema

RoleSchema = new Schema({
  description: String,
  add_deployment: Boolean,
  name: String,
  add_user: Boolean,
  control_devices: Boolean,
  active: Boolean,
  added: {
    type: Date,
    default: Date.now
  }
})
RoleSchema
    .virtual('url')
    .get(function () {
      return '/api/role/' + this._id
    })
module.exports = mongoose.model('Role', RoleSchema)
