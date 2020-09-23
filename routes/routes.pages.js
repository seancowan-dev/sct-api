const path = require('path');
const express = require('express');
const xss = require('xss');
const { requireAPIKey } = require('../middleware/auth');
const { requireAuth } = require('../middleware/loginAuth');
const pageRouter = express.Router()
const bodyParser = express.json({limit: '50mb'})
const PageService = require('../services/service.pages');

// These routes are for storing and retrieving pages from the server

//CREATE - single
pageRouter // READ
    .route('/create/:name') // Create a page entry
    .post(bodyParser, (req, res, next) => {
        PageService.createComponentEntry(req.app.get('db'), req.body).then(page => {
            res.set('Content-Type', 'application/json')
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${req.params.name}`))
            .json({page});
        })
        .catch(next);
    });
//READ - single
pageRouter // READ
    .route('/get/:name') // Get a specified page by name
    .get((req, res, next) => {
        PageService.getComponentByName(req.app.get('db'), req.params.name).then(page => {
            res.set('Content-Type', 'application/json')
            .status(200)
            .location(path.posix.join(req.originalUrl, `/${req.params.name}`))
            .json({page});
        })
        .catch(next);
    });

//UPDATE - single
pageRouter // READ
    .route('/update/:name') // Update a specified page by name
    .patch(bodyParser, (req, res, next) => {
        PageService.updateComponentByName(req.app.get('db'), req.params.name, req.body).then(page => {
            res.set('Content-Type', 'application/json')
            .status(200)
            .location(path.posix.join(req.originalUrl, `/${req.params.name}`))
            .json({page});
        })
        .catch(next);
    });

//DELETE - single
pageRouter // READ
    .route('/delete/:name') // Delete a specified page by name
    .delete((req, res, next) => {
        PageService.deleteComponentByName(req.app.get('db'), req.params.name).then(page => {
            res.set('Content-Type', 'application/json')
            .status(204).end();
        })
        .catch(next);
    });

//CREATE - multi

//READ - multi
pageRouter // READ
    .route('/get') // Get pages
    .get((req, res, next) => {
        PageService.getAllComponents(req.app.get('db')).then(pages => {
            res.set('Content-Type', 'application/json')
            .status(200)
            .location(path.posix.join(req.originalUrl, `/${req.params.name}`))
            .json({pages});
        })
        .catch(next);
    });
//UPDATE - multi

//DELETE - multi

module.exports = pageRouter;