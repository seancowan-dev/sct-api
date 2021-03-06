const DataService = {

    // The get, update, create and delete methods here are for when the user selects the 'update all' button
    // from the Admin Panel page for Nav Links
    getAllNavLinks(knex, site_id) { // Get all the nav links for a specified site
        return knex.select('*').from('routes').where({site_id});
    },
    createFullNavLinks(knex, nav_json) { // Create a new (complete) nav links entry
        return knex.insert(nav_json).into('routes').returning('*').then(links => { return links });
    },
    updateFullNavLinks(knex, site_id, nav_json) { // Update an entire (complete) nav links entry for a specified site
        return knex.transaction((trx) => {
            const queries = nav_json.map((link, index) => {
                const updated = knex('routes')
                .where('id', link.id)
                .update(link)
                .returning('*')
                .transacting(trx);

                return updated;
            });

            return Promise.all(queries).then(trx.commit).catch(trx.rollback);
        }).then((links) => {
            return links;
        })
        .catch((err) => {
            console.log(err);
        });
        // console.log(nav_json);
        // return knex('routes').where({site_id}).update(nav_json).returning('*').then(links => { return links });
    },
    deleteFullNavLinks(knex, site_id) { // Delete all nav link entries for a specified site
        return knex('routes').where({site_id}).delete();
    },

    // The get, update, create and delete methods here are for when the user select to update only a single nav link
    // from the Admin Panel page for Nav Links
    getSingleNavLink(knex, site_id, id) { // Get a single nav link for a specified site
        return knex.select('*').from('routes').where({site_id, id});
    },
    createSingleNavLink(knex, link_json) { // Create a single nav link 
        return knex.insert(link_json).into('routes').returning('*').then(rows => { return rows[0] });
    },
    updateSingleNavLink(knex, id, link_json) { // Update a single nav link for a specified site
        return knex('routes').where({id}).update(link_json).returning('*').then(rows => { return rows[0] });
    },
    deleteSingleNavLink(knex, id) { // Delete a single nav link for a specified site
        return knex('routes').where({id}).delete();
    },
}

module.exports = DataService;