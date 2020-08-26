const InstallService = {

    // These methods are for the initial install of the CMS

    getBasicInstallStatus(knex, id) { // Get a single nav link for a specified site
        return knex.select('*').from('install').where({id});
    },
    createSiteInstallation(knex, install) { // Create a single nav link 
        return knex.insert(install).into('install').returning('*').then(rows => { return rows[0] });
    },
    installBasicSite(knex, id, install) { // Update a single nav link for a specified site
        return knex('install').where({id}).update(install).returning('*').then(rows => { return rows[0] });
    },
    deleteSiteEntry(knex, id) { // Delete a single nav link for a specified site
        return knex('install').where({id}).delete();
    },
}

module.exports = InstallService;