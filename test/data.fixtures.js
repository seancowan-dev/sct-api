function makeTestData() {
    const navLinks = [
        {
            "id": "64fd3e42-0ad1-418c-8a3e-214164807b6f",
            "site_id": "a18092d2-1f4c-4214-9046-3cf6c8d895a7",
            "name": "Acceptable Insurance Co.",
            "component_name": "Test",
            "route_path": "/testLocation/new/:id",
            "prop_names": "id",
            "created_at": "2020-08-18 12:00:00-07"
        },
        {
            "id": "cb829f9a-d956-4233-a163-967ae93c158c",
            "site_id": "a18092d2-1f4c-4214-9046-3cf6c8d895a7",
            "name": "Acceptable Insurance Co.",
            "component_name": "Test",
            "route_path": "/testLocation/old/:id",
            "prop_names": "id",
            "created_at": "2020-08-18 12:00:00-07"
        },
        {
            "id": "31003fca-3bdd-46f3-856d-de375f45469a",
            "site_id": "a18092d2-1f4c-4214-9046-3cf6c8d895a7",
            "name": "Acceptable Insurance Co.",
            "component_name": "Test",
            "route_path": "/testLocation/reallyNew/:id",
            "prop_names": "id",
            "created_at": "2020-08-18 12:00:00-07"
        },
        {
            "id": "0b7c9b07-7c6a-4e63-aff9-0f3911e088bc",
            "site_id": "2e98b7e4-37a9-4ee5-b8ce-4e960e99eeb0",
            "name": "Just Okay Muffler Shop",
            "component_name": "Test",
            "route_path": "/testLocation/new/:id",
            "prop_names": "id",
            "created_at": "2020-08-18 12:00:00-07"
        },
        {
            "id": "cddae346-afbe-4393-82d5-8ad48409932b",
            "site_id": "2e98b7e4-37a9-4ee5-b8ce-4e960e99eeb0",
            "name": "Just Okay Muffler Shop",
            "component_name": "Test",
            "route_path": "/testLocation/duckSauce/",
            "created_at": "2020-08-18 12:00:00-07"
        },
        {
            "id": "d4e15f78-48d4-4c39-b086-f1c535a177f9",
            "site_id": "2e98b7e4-37a9-4ee5-b8ce-4e960e99eeb0",
            "name": "Just Okay Muffler Shop",
            "component_name": "Test",
            "route_path": "/where/is/the/lamb/sauce",
            "created_at": "2020-08-18 12:00:00-07"
        }
    ];

    const updatedLinks = [
        {
            "id": "64fd3e42-0ad1-418c-8a3e-214164807b6f",
            "site_id": "a18092d2-1f4c-4214-9046-3cf6c8d895a7",
            "name": "Unacceptable Insurance Co.",
            "component_name": "Test",
            "route_path": "/testLocation/new/:id",
            "prop_names": "id",
            "created_at": "2020-08-18 12:00:00-07"
        },
        {
            "id": "cb829f9a-d956-4233-a163-967ae93c158c",
            "site_id": "a18092d2-1f4c-4214-9046-3cf6c8d895a7",
            "name": "Unacceptable Insurance Co.",
            "component_name": "Test",
            "route_path": "/testLocation/old/:id",
            "prop_names": "id",
            "created_at": "2020-08-18 12:00:00-07"
        },
        {
            "id": "31003fca-3bdd-46f3-856d-de375f45469a",
            "site_id": "a18092d2-1f4c-4214-9046-3cf6c8d895a7",
            "name": "Unacceptable Insurance Co.",
            "component_name": "Test",
            "route_path": "/testLocation/reallyNew/:id",
            "prop_names": "id",
            "created_at": "2020-08-18 12:00:00-07"
        },
        {
            "id": "0b7c9b07-7c6a-4e63-aff9-0f3911e088bc",
            "site_id": "2e98b7e4-37a9-4ee5-b8ce-4e960e99eeb0",
            "name": "Epic Muffler Shop",
            "component_name": "Test",
            "route_path": "/testLocation/new/:id",
            "prop_names": "id",
            "created_at": "2020-08-18 12:00:00-07"
        },
        {
            "id": "cddae346-afbe-4393-82d5-8ad48409932b",
            "site_id": "2e98b7e4-37a9-4ee5-b8ce-4e960e99eeb0",
            "name": "Epic Muffler Shop",
            "component_name": "Test",
            "route_path": "/testLocation/duckSauce/",
            "created_at": "2020-08-18 12:00:00-07"
        },
        {
            "id": "d4e15f78-48d4-4c39-b086-f1c535a177f9",
            "site_id": "2e98b7e4-37a9-4ee5-b8ce-4e960e99eeb0",
            "name": "Epic Muffler Shop",
            "component_name": "Test",
            "route_path": "/where/is/the/lamb/sauce",
            "created_at": "2020-08-18 12:00:00-07"
        }
    ];

    return { navLinks, updatedLinks };
}

module.exports = {
    makeTestData
}