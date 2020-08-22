const path = require('path');
const express = require('express');
const xss = require('xss');
const { requireAPIKey } = require('../middleware/auth');
const { requireAuth } = require('../middleware/loginAuth');
const installRouter = express.Router()
const bodyParser = express.json()
const InstallService = require('../services/service.install');

// Nav
installRouter // READ
    .route('/check') // Get all the nav links for the specified site
    .get((req, res, next) => {

    });

installRouter // READ
    .route('/checkInstall') // Get all the nav links for the specified site
    .get((req, res, next) => {

    });

installRouter // CREATE
    .route('/:site') // Create a complete nav links DB entry for a specified site
    .post(bodyParser, (req, res, next) => {
        InstallService.createSiteInstallation(req.app.get('db'), req.body).then(install => {
            res.set('Content-Type', 'application/json')
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${req.params.site}`))
            .json({install});
        })
    });

installRouter // UPDATE
    .route('/update/:site') // Update an entire nav links DB entry for a specified site
    .patch(bodyParser, (req, res, next) => {

    });

installRouter // DELETE
    .route('/delete/:site') // Delete an entire nav links DB entry for a specified site
    .delete((req, res, next) => {
        // do stuff here
    });

module.exports = installRouter;