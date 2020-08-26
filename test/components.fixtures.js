const moment = require('moment');

function makeTestComps() {
    const comps = [
        {
            "id": "6e1f15c4-4277-4f46-95f5-96b8d0c3cece",
            "name": "Primary",
            "created_at": `${moment().format()}`
        }
    ];

    const updatedComps = [
        {
            "id": "6e1f15c4-4277-4f46-95f5-96b8d0c3cece",
            "name": "Home",
            "created_at": `${moment().format()}`
        }
    ];

    return { comps, updatedComps };
}

module.exports = {
    makeTestComps
}