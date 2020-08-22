const InstallService = {

    // These methods are for the initial install of the CMS

    getSingleNavLink(knex, site_id, id) { // Get a single nav link for a specified site
        return knex.select('*').from('routes').where({site_id, id});
    },
    createSiteInstallation(knex, install) { // Create a single nav link 
        return knex.insert(install).into('install').returning('*').then(rows => { return rows[0] });
    },
    updateSingleNavLink(knex, id, link_json) { // Update a single nav link for a specified site
        return knex('routes').where({id}).update(link_json).returning('*').then(rows => { return rows[0] });
    },
    deleteSingleNavLink(knex, id) { // Delete a single nav link for a specified site
        return knex('routes').where({id}).delete();
    },

}

module.exports = InstallService;