const fs = require('fs')
const path = require('path')
const csv = require('fast-csv')
const jsonfile = require('jsonfile')

var rgbToHex = function (rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

var fullColorHex = function(r,g,b) {
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return `#${red}${green}${blue}`
};

const convert = (line) => {
  return {
    name: line ['Name'],
    rgb: `rgb(${line['RGB']})` ,
    hex: fullColorHex(line ['r'], line ['g'], line ['b'])
  }
}

const options = {
  headers: true,
  objectMode: true,
  ignoreEmpty: true,
  trim: true,
  delimiter: ';'
}

let json = []
fs.createReadStream(path.resolve(__dirname, '', 'colors.csv'))
    .pipe(csv.parse(options))
    .on('error', error => console.error(error))
    .on('data', row => json.push(convert(row)))
    .on("end", function () {
      console.info(JSON.stringify(json))
      jsonfile.writeFile('hex-colors.json', json, function (err) {
         console.error(err)
      })
    })