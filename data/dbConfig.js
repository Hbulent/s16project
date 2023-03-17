const knex = require("knex");
const configFile = require("../knexfile");

const environment = "development";
module.exports = knex(configFile[environment]);
