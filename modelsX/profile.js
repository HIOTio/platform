var mongoose = require('mongoose')

var Schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')
const SALT_WORK_FACTOR = 10

var ProfileSchema = new Schema({
  username: {
    type: String,
    reauired: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  added: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },

  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  deploymentRoles: {
    type: Schema.Types.ObjectId,
    ref: 'DeploymentRoles'
  }
})
ProfileSchema.path('email').validate(function (email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailRegex.test(email) // Assuming email has a text attribute
}, 'The e-mail field cannot be empty.')
ProfileSchema
	.virtual('url')
	.get(function () {
  return '/api/profile/' + this._id
})

ProfileSchema.pre('save', function (next) {
  var user = this

  if (!user.isModified('password')) return next()

	// generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)

		// hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err)

			// override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})
ProfileSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.password
  return obj
}
ProfileSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}
module.exports = mongoose.model('Profile', ProfileSchema)
