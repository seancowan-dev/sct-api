const ComponentService = {

    // These methods are for retrieving data about components

    getComponentByName(knex, name) { // Get a single nav link for a specified site
        return knex.select('*').from('components').where({name});
    },
    createComponentEntry(knex, component) { // Create a single nav link 
        return knex.insert(component).into('components').returning('*').then(rows => { return rows[0] });
    },
    updateComponentByName(knex, name, component) { // Update a single nav link for a specified site
        return knex('components').where({name}).update(component).returning('*').then(rows => { return rows[0] });
    },
    deleteComponentByName(knex, name) { // Delete a single nav link for a specified site
        return knex('components').where({name}).delete();
    },
}

module.exports = ComponentService;