const PageService = {

    // These methods are for retrieving data for pages

    getComponentByName(knex, name) { // Get a single page 
        return knex.select('*').from('pages').where({name});
    },
    getAllComponents(knex) { // Get all pages
        return knex.select('*').from('pages');
    },
    createComponentEntry(knex, page) { // Create a single page 
        return knex.insert(page).into('pages').returning('*').then(rows => { return rows[0] });
    },
    updateComponentByName(knex, name, page) { // Update a single page
        return knex('pages').where({name}).update(page).returning('*').then(rows => { return rows[0] });
    },
    deleteComponentByName(knex, name) { // Delete a single page
        return knex('pages').where({name}).delete();
    },
}

module.exports = PageService;