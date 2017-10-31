var _ = require('lodash')
var jwt = require('jsonwebtoken')
var passport = require('passport')
var passportJWT = require('passport-jwt')
var ExtractJwt = passportJWT.ExtractJwt
var JwtStrategy = passportJWT.Strategy
var config = require('./config')

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
jwtOptions.secretOrKey = config.secret

var strategy = new JwtStrategy(jwtOptions, function (jwtPayload, next) {
  Profile.find_by_id(jwtPayload.id, function (err, user) {
    if (this) {
      next(null, this)
    } else {
      next(null, false)
    }
  })
})
passport.use(strategy)
app.use(passport.initialize())

module.exports = function () {
  return passport.authenticate('jwt', {
    session: false
  })
}
