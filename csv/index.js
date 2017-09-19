const fs = require("fs")
const csv = require("fast-csv")
const jsonfile = require('jsonfile')

const options = {
  headers: true,
  objectMode: true,
  ignoreEmpty: true,
  trim: true
}

const convert = (line) => {
  const leguminous = line["Leguminose (ÖVF)"] === 'x' ? true : false
  const short = line["Kulturkürzel"] !== '' ? line["Kulturkürzel"] : line["Ebene6 Name"].substring(0, 4)
  return {
    name: line["Ebene6 Name"],
    abbreviation: short,
    leguminous: leguminous,
    code: line["Code (Antrag)"],
    level1Name: line["Ebene1 Name"],
    level2Name: line["Ebene2 Name"],
    level3Name: line["Ebene3 Name"],
    level4Name: line["Ebene4 Name"],
    level5Name: line["Ebene5 Name"],
  }
}

let result = []
let json = []
csv.fromPath("crops.csv", options)
  .on("data", function (data) {
    result.push(data)
  })
  .on("end", function () {
    result.map((curr) => {
      json.push(convert(curr))
    })

    jsonfile.writeFile('out.json', json, function (err) {
      console.error(err)
    })
  });