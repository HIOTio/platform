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

// use it before all route definitions

// Routing
// no auth
app.options("*", cors());
var rNoAuth = require("./routes/no_auth");
    // with auth
var rAggregator = require("./routes/aggregator");
var rBroker = require("./routes/broker");
var rConfig = require("./routes/config");
var rController = require("./routes/controller");
var rControllerCommand = require("./routes/controller_command");
var rCoordinator = require("./routes/coordinator");
var rCoordinatorGroups = require("./routes/coordinator_groups");
var rDashboard = require("./routes/dashboard");
var rDeployment = require("./routes/deployment");
var rDeploymentRole = require("./routes/deployment_role");
var rDeploymentType = require("./routes/deployment_type");
var rDevice = require("./routes/device");
var rDeviceConfiguration = require("./routes/device_configuration");
var rDeviceMake = require("./routes/device_make");
var rDeviceModel = require("./routes/device_model");
var rGroups = require("./routes/groups");
var rHealth = require("./routes/health");
var rHandler = require("./routes/handler");
var rLocation = require("./routes/location");
var rParam = require("./routes/param");
var rPlatform = require("./routes/platform");
var rProfile = require("./routes/profile");
var rPublication = require("./routes/publication");
var rRole = require("./routes/role");
var rSensor = require("./routes/sensor");
var rSensorReading = require("./routes/sensor_reading");
var rSensorTypes = require("./routes/sensor_types");
var rSubscription = require("./routes/subscription");
var rThing = require("./routes/thing");
var rTopic = require("./routes/topic");
var rNavigation = require("./routes/navigation");

app.use("/", rNoAuth);
app.use("/api/aggregator", rAggregator);
app.use("/api/broker", rBroker);
app.use("/api/config", rConfig);
app.use("/api/controller", rController);
app.use("/api/controller_command", rControllerCommand);
app.use("/api/coordinator", rCoordinator);
app.use("/api/coordinator_groups", rCoordinatorGroups);
app.use("/api/dashboard", rDashboard);
app.use("/api/deployment", rDeployment);
app.use("/api/deployment_role", rDeploymentRole);
app.use("/api/deployment_type", rDeploymentType);
app.use("/api/device", rDevice);
app.use("/api/device_configuration", rDeviceConfiguration);
app.use("/api/device_make", rDeviceMake);
app.use("/api/device_model", rDeviceModel);
app.use("/api/groups", rGroups);
app.use("/api/handler", rHandler);
app.use("/api/health", rHealth);
app.use("/api/location", rLocation);
app.use("/api/param", rParam);
app.use("/api/platform", rPlatform);
app.use("/api/profile", rProfile);
app.use("/api/publication", rPublication);
app.use("/api/role", rRole);
app.use("/api/sensor", rSensor);
app.use("/api/sensor_reading", rSensorReading);
app.use("/api/sensor_types", rSensorTypes);
app.use("/api/subscription", rSubscription);
app.use("/api/thing", rThing);
app.use("/api/topic", rTopic);
app.use("/api/navigation", rNavigation);

app.get("/", function(req, res) {
    res.send("HIOT Platform!");
})
app.listen(3000, function() {});