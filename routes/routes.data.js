const path = require('path');
const express = require('express');
const xss = require('xss');
const { requireAPIKey } = require('../middleware/auth');
const { requireAuth } = require('../middleware/loginAuth');
const dataRouter = express.Router()
const bodyParser = express.json()
const DataService = require('../services/service.data');

// Nav
dataRouter // READ
    .route('/nav/get/:site') // Get all the nav links for the specified site
    .get((req, res, next) => {
        DataService.getAllNavLinks(req.app.get('db'), req.params.site).then(links => {
            res.set('Content-Type', 'application/json')
            .status(200)
            .location(path.posix.join(req.originalUrl, `/${req.params.site}`))
            .json({links});
        });
    });

dataRouter // CREATE
    .route('/nav/create/:site') // Create a complete nav links DB entry for a specified site
    .post(bodyParser, (req, res, next) => {
        DataService.createFullNavLinks(req.app.get('db'), req.body).then(links => {
            res.set('Content-Type', 'application/json')
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${req.params.site}`))
            .json({links});
        });
    });

dataRouter // UPDATE
    .route('/nav/update/:site') // Update an entire nav links DB entry for a specified site
    .patch(bodyParser, (req, res, next) => {
        DataService.updateFullNavLinks(req.app.get('db'), req.params.site, req.body).then(links => {
            res.set('Content-Type', 'application/json')
            .status(200)
            .location(path.posix.join(req.originalUrl, `/${req.id}`))
            .json({links});
        })
    });

dataRouter // DELETE
    .route('/nav/delete/:site') // Delete an entire nav links DB entry for a specified site
    .delete((req, res, next) => {
        // do stuff here
    });

dataRouter // READ
    .route('/nav/get/:site/single/:navLink') // Get a single nav link for the specified site
    .get((req, res, next) => {
        DataService.getSingleNavLink(req.app.get('db'), req.params.site, req.params.navLink).then(dbEntry => {
            res.set('Content-Type', 'application/json')
            .status(200)
            .json({dbEntry});
            
        })
        .catch(next);
    });

dataRouter // CREATE
    .route('/nav/create/:site/single/') // Create a single nav link entry for a specified site
    .post(bodyParser, (req, res, next) => {
        DataService.createSingleNavLink(req.app.get('db'), req.body).then(link => {
            res.set('Content-Type', 'application/json')
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${req.id}`))
            .json({link});
        })
        .catch(next);
    });    

dataRouter // UPDATE
    .route('/nav/update/:site/single/:navLink') // Update a single nav link DB entry for a specified site
    .patch(bodyParser, (req, res, next) => {
        DataService.updateSingleNavLink(req.app.get('db'), req.params.navLink, req.body).then(dbEntry => {
            res.set('Content-Type', 'application/json')
            .status(200)
            .location(path.posix.join(req.originalUrl, `/${req.id}`))
            .json({dbEntry});
        })
        .catch(next);
    });

dataRouter // DELETE
    .route('/nav/delete/:site/single/:navLink') // Delete a single nav link DB entry for a specified site
    .delete((req, res, next) => {
        DataService.deleteSingleNavLink(req.app.get('db'), req.params.navLink).then(response => {
            res.set('Content-Type', 'application/json')
            .status(204).end();
        })
        .catch(next);
    });
module.exports = dataRouter;