const path = require('path');
const express = require('express');
const xss = require('xss');
const { requireAPIKey } = require('../middleware/auth');
const { requireAuth } = require('../middleware/loginAuth');
const componentRouter = express.Router()
const bodyParser = express.json({limit: '50mb'})
const ComponentService = require('../services/service.components');

// These routes are for storing and retrieving components from the server
// Ver 1 - Store just the name to access locally (client-side) installed comps
// Ver 2 - Eventually refactor so that all components displayed on the site are taken directly from the database

//CREATE - single
componentRouter // READ
    .route('/create/:name') // Create a component entry
    .post(bodyParser, (req, res, next) => {
        console.log(req.body);
        ComponentService.createComponentEntry(req.app.get('db'), req.body).then(comp => {
            console.log(comp);
            res.set('Content-Type', 'application/json')
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${req.params.name}`))
            .json({comp});
        })
        .catch(next);
    });
//READ - single
componentRouter // READ
    .route('/get/:name') // Get a specified component by name
    .get((req, res, next) => {
        ComponentService.getComponentByName(req.app.get('db'), req.params.name).then(comp => {
            res.set('Content-Type', 'application/json')
            .status(200)
            .location(path.posix.join(req.originalUrl, `/${req.params.name}`))
            .json({comp});
        })
        .catch(next);
    });

//UPDATE - single
componentRouter // READ
    .route('/update/:name') // Update a specified component by name
    .patch(bodyParser, (req, res, next) => {
        ComponentService.updateComponentByName(req.app.get('db'), req.params.name, req.body).then(comp => {
            res.set('Content-Type', 'application/json')
            .status(200)
            .location(path.posix.join(req.originalUrl, `/${req.params.name}`))
            .json({comp});
        })
        .catch(next);
    });

//DELETE - single
componentRouter // READ
    .route('/delete/:name') // Delete a specified component by name
    .delete((req, res, next) => {
        ComponentService.deleteComponentByName(req.app.get('db'), req.params.name).then(comp => {
            res.set('Content-Type', 'application/json')
            .status(204).end();
        })
        .catch(next);
    });

//CREATE - multi

//READ - multi
componentRouter // READ
    .route('/get') // Get a specified component by name
    .get((req, res, next) => {
        ComponentService.getAllComponents(req.app.get('db')).then(comps => {
            res.set('Content-Type', 'application/json')
            .status(200)
            .location(path.posix.join(req.originalUrl, `/${req.params.name}`))
            .json({comps});
        })
        .catch(next);
    });
//UPDATE - multi

//DELETE - multi

module.exports = componentRouter;