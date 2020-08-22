function makeTestInstall() {
    const install = [
        {
            "id": "64fd3e42-0ad1-418c-8a3e-214164807b6f",
            "name": "Just A Site",
            "installed": "false",
            "created_at": "2020-08-18 12:00:00-07"
        }
    ];

    const updateInstall = [
        {
            "id": "64fd3e42-0ad1-418c-8a3e-214164807b6f",
            "name": "Just A Site, Now Better",
            "installed": "true",
        }
    ];

    return { install, updateInstall };
}

module.exports = {
    makeTestInstall
}