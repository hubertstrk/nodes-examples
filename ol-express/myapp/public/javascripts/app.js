window.onload = function(){
    console.log('window loaded')

    const wkt = "POLYGON((15.869179666042328 48.54554212880166,15.871078670024872 48.545716145940816,15.871143043041231 48.54542493324834,15.869210511446 48.5452349338201,15.869179666042328 48.54554212880166))"    
    const sphere = new ol.Sphere(6378137)

    const olwkt = new ol.format.WKT()
    const feature = olwkt.readFeature(wkt)

    const current_projection = new ol.proj.Projection({code: "EPSG:4326"});
    const new_projection = new ol.proj.Projection({code: "EPSG:900913"});
    const geometry = feature.getGeometry()
    //const transformedGeometry = geometry.clone().transform(current_projection, new_projection);    

    //console.log(transformedGeometry.getCoordinates())
    const area = sphere.geodesicArea(geometry.getGeometry())
    console.log(area)
}