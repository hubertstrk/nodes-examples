const argv = require('yargs').argv;

// node main.js -x 
if ( argv.x )
{
    console.log("boolean arg")
}

// node main.js -y 1.234
// node main.js -y would give 'true'
if ( argv.y )
{
    console.log(`number ${argv.y}`)
}

// node main.js --variable 1.234
if ( argv.variable )
{
    console.log(`number ${argv.variable}`)
}