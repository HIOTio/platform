var user_deployments = require('../models/deployment_role')

exports.navigation_list = function (req, res, next) {
  var my_menu = []
  var children = []
  var item_collapse = 'nav-item'
  var prom_depl = new Promise(function (resolve, reject) {
    user_deployments.find({
      profile: req.params.profile
    }).populate('deployment').exec(function (err, deployment_role) {
      if (err) {
        return err
      }
      resolve(deployment_role)
    })
  })

  Promise.all([prom_depl])
		.then(data => {
			// build the menu
  my_menu.push({
    'title': 'Dashboard',
    'type': 'nav-item',
    'url': '/dashboard',
    'icon': 'dashboard'

  })
			// create list of deployments
			// only add an "ALL" option if there is more than one deployment for the user
  if (data[0].length > 1) {
    children.push({
      'title': '--- All ---',
      'url': '/deployments',
      'type': 'nav-item',
      'icon': 'group_work'

    })
  }
  for (var i = 0; i < data[0].length; i++) {
 //   console.log(data[0][i].deployment.name)
    children.push({
      'title': data[0][i].deployment.name,
      'url': '/deployment/' + data[0][i].deployment._id,
      'type': 'nav-item',
      'icon': 'business'
    })
  }
  if (children.length > 0) {
    children.push({
      'title': '--- New ---',
      'url': '/deployment/new',
      'type': 'nav-item',
      'icon': 'add_circle'
    })
    my_menu.push({
      'title': 'Deployments',
      'url': '/deployments',
      'type': 'nav-collapse',
      'icon': 'business',
      'children': children
    })
    item_collapse = 'nav_collapse'
  } else {
    my_menu.push({
      'title': 'Add Deployment',
      'url': '/deployment/new',
      'type': 'nav-item'
    })
  }
  my_menu.push({
    'title': 'Reports',
    'url': '/reports',
    'type': 'nav-item',
    'icon': 'insert_chart'
  })

//  console.log(my_menu)
  res.send(my_menu)
})
}
