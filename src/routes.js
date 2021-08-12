const express = require('express'); // biblioteca para criar um servidor
const routes = express.Router() // caminhos
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')
// usando template engine em EJS 

routes.get('/', DashboardController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.post('/job/:id', JobController.update)
routes.get('/job/:id', JobController.show)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)


module.exports = routes;