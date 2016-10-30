const argv = require('yargs').argv
const fs = require('fs')
var config = require('config')

var dbConfig = config.get('Customer.dbConfig')
console.log(dbConfig)

