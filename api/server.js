const express = require('express');
const actionsRoutes=require('./../api/actions/actions-router')
const projectsRoutes=require('./../api/projects/projects-router')
const server = express();
server.use(express.json())
server.use('/api/projects',projectsRoutes)
server.use('/api/actions',actionsRoutes)



module.exports = server;
