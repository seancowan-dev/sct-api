const moment = require('moment');

function makeTestPages() {
    const pages = [
        {
            "id": "6e1f15c4-4277-4f46-95f5-96b8d0c3cece",
            "name": "Primary",
            "page_data": "<p>hi i'm a page</p>",
            "created_at": `${moment().format()}`
        }
    ];

    const updatedPages = [
        {
            "id": "6e1f15c4-4277-4f46-95f5-96b8d0c3cece",
            "name": "Home",
            "page_data": "<p>hi i'm a different page now</p>",
            "created_at": `${moment().format()}`
        }
    ];

    return { pages, updatedPages };
}

module.exports = {
    makeTestPages
}