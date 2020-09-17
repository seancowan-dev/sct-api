const moment = require('moment');

function makeTestComps() {
    const comps = [
        {
            "id": "6e1f15c4-4277-4f46-95f5-96b8d0c3cece",
            "name": "Primary",
            "component_data": "01101000 01100101 01110010 01100101 00100000 01101001 01110011 00100000 01110011 01101111 01101101 01100101 00100000 01110011 01100001 01101101 01110000 01101100 01100101 00100000 01100100 01100001 01110100 01100001",
            "created_at": `${moment().format()}`
        }
    ];

    const updatedComps = [
        {
            "id": "6e1f15c4-4277-4f46-95f5-96b8d0c3cece",
            "name": "Home",
            "component_data": "01101000 01100101 01110010 01100101 00100000 01101001 01110011 00100000 01110011 01101111 01101101 01100101 00100000 01110011 01100001 01101101 01110000 01101100 01100101 00100000 01100100 01100001 01110100 01100001",
            "created_at": `${moment().format()}`
        }
    ];

    return { comps, updatedComps };
}

module.exports = {
    makeTestComps
}