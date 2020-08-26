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
    .route('/check/:site') // Get the installed status of the site
    .get((req, res, next) => {
        InstallService.getBasicInstallStatus(req.app.get('db'), req.params.site).then(install => {
            res.set('Content-Type', 'application/json')
            .status(200)
            .location(path.posix.join(req.originalUrl, `/${req.params.site}`))
            .json({install});
        })
        .catch(next);
    });

installRouter // CREATE
    .route('/preinstall/:site') // Create a site entry in the database, but do not install yet
    .post(bodyParser, (req, res, next) => {
        InstallService.createSiteInstallation(req.app.get('db'), req.body).then(install => {
            res.set('Content-Type', 'application/json')
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${req.params.site}`))
            .json({install});
        })
        .catch(next);
    });

installRouter // UPDATE (Install Site)
    .route('/:site') // Sets the site to 'installed' status : change installed status
    .patch(bodyParser, (req, res, next) => {
        InstallService.installBasicSite(req.app.get('db'), req.params.site, req.body).then(install => {
            res.set('Content-Type', 'application/json')
            .status(202)
            .location(path.posix.join(req.originalUrl, `/${req.params.site}`))
            .json({install});
        })
        .catch(next);
    });

installRouter // DELETE
    .route('/delete/:site') // Delete a site from the database
    .delete((req, res, next) => {
        InstallService.deleteSiteEntry(req.app.get('db'), req.params.site).then(response => {
            res.set('Content-Type', 'application/json')
            .status(204).end();
        })
        .catch(next);
    });

module.exports = installRouter;