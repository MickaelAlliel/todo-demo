var port = 4000;
var dbUri = "mongodb://localhost/todoapp";
if (process.env.DOCKERIZED == 'yes') {
    dbUri = "mongodb://mongo/todoapp";
}

module.exports = {
    port: dbUri,
    dbUri: dbUri,
}