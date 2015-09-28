var map = L.map('map').setView([61.0, -101.84], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmFydGxldHRyIiwiYSI6ImJZaWVsOHMifQ.Phd2UxnLvo6F2oZdmyzRlQ', {

	maxZoom: 18,

	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',

	id: 'mapbox.streets'

}).addTo(map);

//set up icon for Cities layer
var cityIcon = L.icon({
  iconUrl: 'opendata/sprite.png', //sprite from https://github.com/calvinmetcalf/leaflet.sprite/blob/master/sprites.png
  iconSize: [30,45],
  iconAnchor: [15,40]
})

//add Provinces layer
$.getJSON('opendata/provterr_final.geojson',function(Provinces){
  L.geoJson( Provinces,{
		//style code below from http://leafletjs.com/examples/geojson.html
		style: function(feature){
			switch (feature.properties.opendata) {
				case 'Y': return {weight: 1, color: "#000066"};
				default: return {weight: 1, color: "#ffffff"};
			}
		},
		onEachFeature: function(feature, layer){
			layer.bindPopup("<strong><a href='" + feature.properties.url + "' target='_blank'>" + feature.properties.name + "</a></strong><br></br>" + feature.properties.notes);
			return layer;
		}
	}).addTo(map);
});

//add Regions layer
$.getJSON('opendata/regions.geojson',function(Regions){
  L.geoJson( Regions,{
		style: function (feature){
			return {weight: 2, color: "#08184D", fillOpacity: 0.6};
		},
		onEachFeature: function(feature, layer){
			layer.bindPopup("<strong><a href='" + feature.properties.url + "' target='_blank'>" + feature.properties.name + "</a></strong>");
			return layer;
		}
	}).addTo(map);
});

//add Cities layer
$.getJSON('opendata/cities.geojson',function(data){
    L.geoJson(data,{
      pointToLayer: function(feature,latlng){
        var marker = L.marker(latlng,{icon: cityIcon});
	marker.bindPopup("<strong><a href='" + feature.properties.url + "' target='_blank'>" + feature.properties.city + "</a></strong>");
	return marker;
      }
  }).addTo(map);
});
