var express = require("express");
var bodyParser = require("body-parser");
var compression = require("compression");
var expressValidator = require("express-validator");
require("./api/db");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var sockets = require("./sockets");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var config = require("./config");
var app = express();
app.use(bodyParser.json());
sockets.init(app);
var cors = require("cors");
app.use(expressValidator());
    // var expressJwt = require("express-jwt")
    // var db = require("./api/db")
var Profile = require("./controllers/profile");

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = config.secret;

var strategy = new JwtStrategy(jwtOptions, function(jwtPayload, next) {
    Profile.findById(jwtPayload.id, function(err, user) {
        if (this) {
            next(null, this);
        } else {
            next(null, false);
        }
    });
});
passport.use(strategy);
app.use(compression());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(cors({
    origin: ["http://localhost:4200", "http://54.37.228.181/be","http://54.37.228.181"]
}));
app.use(passport.initialize());

app.use("/api", passport.authenticate("jwt", {
    session: false
}));

app.options("*", cors());
var r={
    "no_auth":"/",
    "aggregator":"/api/aggregator",
	"broker":"/api/broker",
	"commander":"/api/commander",
	"config":"/api/config",
	"controller":"/api/controller",
	"controller_command":"/api/controller_command",
	"coordinator":"/api/coordinator",
	"coordinator_groups":"/api/coordinator_groups",
	"dashboard":"/api/dashboard",
	"deployment":"/api/deployment",
	"deployment_role":"/api/deployment_role",
	"deployment_type":"/api/deployment_type",
	"device":"/api/device",
	"device_configuration":"/api/device_configuration",
	"device_make":"/api/device_make",
	"device_Model":"/api/device_model",
	"groups":"/api/groups",
	"handler":"/api/handler",
	"health":"/api/health",
	"location":"/api/location",
	"organisation":"/api/organisation",
	"org_role":"/api/org_role",
	"param":"/api/param",
	"platform":"/api/platform",
	"profile":"/api/profile",
	"publication":"/api/publication",
	"role":"/api/role",
	"sensor":"/api/sensor",
	"sensor_reading":"/api/sensor_reading",
	"sensor_types":"/api/sensor_types",
	"subscription":"/api/subscription",
	"thing":"/api/thing",
	"topic":"/api/topic",
	"navigation":"/api/navigation"
};
Object.keys(r).forEach(function(filePath){
    app.use(r[filePath],require("./routes/" + filePath));
});

app.get("/", function(req, res) {
    res.send("HIOT Platform!");
});
app.listen(3000, function() {});