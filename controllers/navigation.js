var userDeployments = require("../models/deployment_role");
var debug=require("debug")("controllers/navigation.js");

exports.navigationList = function (req, res, next) {
  var myMEnu = [];
  var children = [];
  var itemCollapse = "nav-item";
  var promDepl = new Promise(function (resolve, reject) {
    userDeployments.find({
      profile: req.params.profile
    }).populate("deployment").exec(function (err, deploymentRole) {
      if (err) { 
        debug(err);
        return err;
      }
      resolve(deploymentRole);
    });
  });

  Promise.all([promDepl])
		.then((data) => {
			// build the menu
  myMEnu.push({
    "title": "Dashboard",
    "type": "nav-item",
    "url": "/dashboard",
    "icon": "dashboard"

  })
			// create list of deployments
			// only add an "ALL" option if there is more than one deployment for the user
  if (data[0].length > 1) {
    children.push({
      "title": "--- All ---",
      "url": "/deployments",
      "type": "nav-item",
      "icon": "group_work"

    })
  }
  for (var i = 0; i < data[0].length; i++) {
 //   console.log(data[0][i].deployment.name)
    children.push({
      "title": data[0][i].deployment.name,
      "url": "/deployment/" + data[0][i].deployment._id,
      "type": "nav-item",
      "icon": "business"
    })
  }
  if (children.length > 0) {
    children.push({
      "title": "--- New ---",
      "url": "/deployment/new",
      "type": "nav-item",
      "icon": "add_circle"
    });
    myMEnu.push({
      "title": "Deployments",
      "url": "/deployments",
      "type": "nav-collapse",
      "icon": "business",
      children
    });
    itemCollapse = "nav_collapse"
  } else {
    myMEnu.push({
      "title": "Add Deployment",
      "url": "/deployment/new",
      "type": "nav-item"
    });
  }
  myMEnu.push({
    "title": "Reports",
    "url": "/reports",
    "type": "nav-item",
    "icon": "insert_chart"
  });

//  console.log(myMEnu)
  res.send(myMEnu);
});
};
