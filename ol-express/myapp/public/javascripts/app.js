window.onload = function(){
    console.log('window loaded')

    const wkt = "POLYGON((15.869179666042328 48.54554212880166,15.871078670024872 48.545716145940816,15.871143043041231 48.54542493324834,15.869210511446 48.5452349338201,15.869179666042328 48.54554212880166))"    
    const sphere = new ol.Sphere(6378137)

    const olwkt = new ol.format.WKT()
    const feature = olwkt.readFeature(wkt)
    const geometry = feature.getGeometry()

    
}