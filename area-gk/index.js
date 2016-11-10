'use strict'

const fetch = require('node-fetch')
const colors = require('colors')
var parseString = require('xml2js').parseString;
var average = require('average');

//http://sg.geodatenzentrum.de/gdz_cts?REQUEST=GetCoordinates&FROMSRS=GEO_DHDN&TOSRS=UTM32&COORDS=10 50 11 51

/*15.869179666042328  48.545542128801657
15.871078670024872  48.545716145940816
15.871143043041231  48.545424933248341
15.869211852550507  48.545240260916557
15.869179666042328  48.545542128801657*/

math.config({
  number: 'BigNumber',  // Default type of number:
                        // 'number' (default), 'BigNumber', or 'Fraction'
  precision: 20         // Number of significant digits for BigNumbers
});

const getUrl = function(from, to, coordinates){
    const url = `http://sg.geodatenzentrum.de/gdz_cts?REQUEST=GetCoordinates&FROMSRS=${from}&TOSRS=${to}&COORDS=${coordinates}`
    return url
}

const coordinates = '48.545542128801657 15.869179666042328 48.545716145940816 15.871078670024872 48.545424933248341 15.871143043041231 48.545240260916557 15.869211852550507 48.545542128801657 15.869179666042328'
const url = getUrl('GEO84_Lat-Lon', 'GK4_N-E', coordinates)
console.log(url)

const opts = { method: 'GET' }

fetch(url, opts)
.then(function(res) {
    console.log(colors.green(res.status))
    console.log(colors.green(res.statusText))
    return res.text()
})
.then(function(xml){
    // log xml
    console.log(xml)
    parseString(xml, function (err, result) {
        // log json
        console.log(result)
        const coords = result.CTS_Response.Coords[0].$.values
        // log coordinates
        console.log(coords)
        const points = objectify(coords)
        const area = computeArea(points)     
        console.log(area)   
    })
})
.catch(function(err) {
	console.log(colors.red(err))
})

const computeArea = function(points){
    let sumXY = ''
    let sumYX = ''
    let i = 1
    for (i = 1; i < points.length; i++) {
        const xy = points[i].Y * points[i-1].X
        const yx = points[i-1].Y * points[i].X
        sumXY += xy
        sumYX += yx
    }
    console.log(sumXY)
    console.log(sumYX)
    let area = (sumXY - sumYX)/2
    return area
}
const objectify = function(coordsString){

    


    const splitted = coordsString.split(" ")
    let points = new Array()
    let i = 0
    for (i = 0; i < splitted.length; i++) {
        if ( (i % 2 == 0) )
        {
            let x = splitted[i]
            let y = splitted[i+1]
            console.log(`${x} ${y}`)
            const point = {X:x, Y:y}
            points.push(point)
        }
    }

    let i = 0
    for (i = 0; i < splitted.length; i++) {

    }
    return points
}