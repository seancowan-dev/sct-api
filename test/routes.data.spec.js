const knex = require('knex');
const app = require('../src/app');
const config = require('../src/config');
const jwt = require('jsonwebtoken')
const { makeTestData } = require('./data.fixtures');
const { expect } = require('chai');
const supertest = require('supertest');
const DataService = require('../services/service.data');
const { deleteSingleNavLink } = require('../services/service.data');

describe('|Data Routes Test Object|', function() {
    // Prepare Necessary Constants and Variables //
    let db;
    let testData = makeTestData();

     // Instantiate Knex Object //
     before('make knex instance', () => {
        db = knex(
            {
                client: "pg",
                connection: config.TEST_DATABASE_URL,
            }
        );
        app.set('db', db);
    })

    // Disconnect and Clean //
    after('disconnect from db', () => db.destroy());
    before('clean table', ()=> db.raw('TRUNCATE routes RESTART IDENTITY CASCADE'));
    
    // Begin Assertions //

    // Base Case for each fixture
    const addSingleNavLink = (link, site_id) => { // For adding a nav link
        describe(`|POST Single Nav Link | current fixture: ${link.id} in site: ${link.name} | /nav/create/:site/single/ `, () => { // Log what fixture is being tested
            it(`should post the link to database and return the entry`, () => { // Try to post a link to the database
                
                return supertest(app)
                .post(`/api/data/nav/create/${site_id}/single/`)
                .send(link)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .then(res => {
                    expect(res.body.link).to.have.property('id');
                    expect(res.body.link).to.have.property('site_id');
                    expect(res.body.link).to.have.property('name');
                    expect(res.body.link).to.have.property('component_name');
                    expect(res.body.link).to.have.property('route_path');
                    expect(res.body.link).to.have.property('created_at');
                    expect(res.body.link).to.have.property('updated_at');  // !important - this is generated by the SQL DB - if this fails something is wrong with the DB
                });
            });
        });
    }

    const getSingleNavLink = (link) => {
        describe(`|GET Single Nav Link | current fixture: ${link.id} | in site: ${link.name} | /nav/get/:site/single/:navLink `, () => { // Log what fixture is being tested
            it(`should get the link from the database`, () => { // Try to get a link from the database
                return supertest(app)
                .get(`/api/data/nav/get/${link.site_id}/single/${link.id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    expect(res.body.dbEntry[0]).to.have.property('id');
                    expect(res.body.dbEntry[0]).to.have.property('site_id');
                    expect(res.body.dbEntry[0]).to.have.property('name');
                    expect(res.body.dbEntry[0]).to.have.property('component_name');
                    expect(res.body.dbEntry[0]).to.have.property('route_path');
                    expect(res.body.dbEntry[0]).to.have.property('created_at');
                    expect(res.body.dbEntry[0]).to.have.property('updated_at'); // !important - this is generated by the SQL DB - if this fails something is wrong with the DB
                });
            });
        });
    }

    const updateSingleNavLink = (link, original) => {
        describe(`|PATCH Single Nav Link | current fixture: ${link.id} | in site: ${link.name} | /nav/update/:site/single/:navLink `, () => { // Log what fixture is being tested
            it(`should update the link in the database`, () => {
                return supertest(app)
                .patch(`/api/data/nav/update/${link.site_id}/single/${link.id}`)
                .set('Accept', 'application/json')
                .send(link)
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    expect(res.body.dbEntry.name).to.not.eql(original.name);
                    expect(res.body.dbEntry.updated_at).to.not.eql(original.updated_at);
                    expect(res.body.dbEntry.site_id).to.eql(original.site_id);
                    expect(res.body.dbEntry.component_name).to.eql(original.component_name);
                    expect(res.body.dbEntry.route_path).to.eql(original.route_path);
                });
            });
        });
    }

    const deleteSingleNavLink = (link) => {
        describe(`|DELETE Single Nav Link | current fixture: ${link.id} | in site: ${link.name} | /nav/get/:site/single/:navLink `, () => { // Log what fixture is being tested
            it(`should delete the link from the database`, () => { // Try to get a link from the database
                return supertest(app)
                .delete(`/api/data/nav/delete/${link.site_id}/single/${link.id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(204);
            });
        });
    }

    // Test POST, GET, UPDATE and DELETE
    testData.navLinks.forEach((link, index) => {
        let id = link.site_id;
        describe(`| Single Nav Link Test Block for: ${link.id} |`, () => {
            addSingleNavLink(link, id);
            getSingleNavLink(link);
            updateSingleNavLink(testData.updatedLinks[index], testData.navLinks[index]);
            deleteSingleNavLink(link);
        });
    });
   

    // Clean again to test updates
    before('clean table', ()=> db.raw('TRUNCATE routes RESTART IDENTITY CASCADE'));

    let test_links_one = testData.navLinks.filter(link => {
        if (link.name === "Acceptable Insurance Co.") {
            return link;
        }
    });

    let test_links_two = testData.navLinks.filter(link => {
        if (link.name === "Just Okay Muffler Shop") {
            return link;
        }
    });

    let updated_links_one = testData.updatedLinks.filter(link => {
        if (link.name === "Unacceptable Insurance Co.") {
            return link;
        }
    });

    let updated_links_two = testData.updatedLinks.filter(link => {
        if (link.name === "Epic Muffler Shop") {
            return link;
        }
    });

    let completeLinks = [
        test_links_one,
        test_links_two
    ];

    let completeUpdated = [
        updated_links_one,
        updated_links_two
    ];

    // Base Case for each fixture
    const addNavLinkList = (links, site_id) => { // For adding a nav link
        describe(`|POST Complete Link List | inserting links for: ${links[0].name} | /nav/create/:site `, () => { // Log what fixture is being tested
            it(`should post all links for the site to the database`, () => { // Try to post the list of links to the database
                
                return supertest(app)
                .post(`/api/data/nav/create/${site_id}`)
                .send(links)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .then(res => {
                    res.body.links.forEach(link => {
                        expect(link).to.have.property('id');
                        expect(link).to.have.property('site_id');
                        expect(link).to.have.property('name');
                        expect(link).to.have.property('component_name');
                        expect(link).to.have.property('route_path');
                        expect(link).to.have.property('created_at');
                        expect(link).to.have.property('updated_at');  // !important - this is generated by the SQL DB - if this fails something is wrong with the DB
                    });                   
                });
            });
        });
    };

    const getNavLinkList = (links, site_id) => {
        describe(`|GET Complete Link List | inserting links for:  ${links[0].name} | /nav/get/:site `, () => { // Log what fixture is being tested
            it(`should get the link from the database`, () => { // Try to get a link from the database
                return supertest(app)
                .get(`/api/data/nav/get/${site_id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    res.body.links.forEach(link => {
                        expect(link).to.have.property('id');
                        expect(link).to.have.property('site_id');
                        expect(link).to.have.property('name');
                        expect(link).to.have.property('component_name');
                        expect(link).to.have.property('route_path');
                        expect(link).to.have.property('created_at');
                        expect(link).to.have.property('updated_at'); // !important - this is generated by the SQL DB - if this fails something is wrong with the DB
                    });
                });
            });
        });
    }

    const updateNavLinkList = (links, originals) => {
        describe(`|PATCH Complete Link List | updating links for:  ${originals[0].name} | /nav/update/:site `, () => { // Log what fixture is being tested
            it(`should change the name to ${links[0].name}`, () => {
                return supertest(app)
                .patch(`/api/data/nav/update/${links[0].site_id}`)
                .set('Accept', 'application/json')
                .send(links)
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    res.body.links.forEach((link, index) => {
                        expect(link[0].name).to.not.eql(originals[index].name);
                        expect(link[0].updated_at).to.not.eql(originals[index].updated_at);
                        expect(link[0].site_id).to.eql(originals[index].site_id);
                        expect(link[0].component_name).to.eql(originals[index].component_name);
                        expect(link[0].route_path).to.eql(originals[index].route_path);
                    });
                });
            });
        });
    }

    // Test POST, GET, PATCH and DELETE
    completeLinks.forEach((list, index) => {
        describe(`| Full Nav Link Test Block for ${list[0].name} |`, () => {
            addNavLinkList(list, list[0].site_id);
            getNavLinkList(list, list[0].site_id);
            updateNavLinkList(completeUpdated[index], completeLinks[index]);
        });
    });

});