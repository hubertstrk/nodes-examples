const argv = require('yargs').argv
const fs = require('fs')
var config = require('config')

console.log(config.get('db.host'))
console.log(config.get('db.port'))
