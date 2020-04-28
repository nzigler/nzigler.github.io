/* global L Tabletop */

/*
 * Script to display two tables from Google Sheets as point and polygon layers using Leaflet
 * The Sheets are then imported using Tabletop.js and overwrite the initially laded layers
 */

// init() is called as soon as the page loads
/*function init() {
  // PASTE YOUR URLs HERE
  // these URLs come from Google Sheets 'shareable link' form
  // the first is the polygon layer and the second the points
  var polyURL =
    "https://docs.google.com/spreadsheets/d/1EUFSaqi30b6oefK0YWWNDDOzwmCTTXlXkFHAc2QrUxM/export?format=csv";
  var pointsURL = "https://docs.google.com/spreadsheets/d/1pv8BUL8xUzOHSrfJOT_NyuDgJ1WG4Yz0kKjMnHnT6DE/edit?usp=sharing";

  Tabletop.init({ key: polyURL, callback: addPolygons, simpleSheet: true });
  Tabletop.init({ key: pointsURL, callback: addPoints, simpleSheet: true }); // simpleSheet assumes there is only one table and automatically sends its data
}
window.addEventListener('DOMContentLoaded', init);*/


//https://github.com/jsoma/tabletop
function init() {
  // PASTE YOUR URLs HERE
  // these URLs come from Google Sheets 'shareable link' form
  // the first is the polygon layer and the second the points
  //var polyURL = "https://docs.google.com/spreadsheets/d/1B0frH_UbekkO4e9sKpwD-GOP_xsXdhouZd_LiMuCwhQ/edit?usp=sharing";
  //var pointsURL = "https://docs.google.com/spreadsheets/d/1pv8BUL8xUzOHSrfJOT_NyuDgJ1WG4Yz0kKjMnHnT6DE/edit?usp=sharing";
    var pointsURL = "https://docs.google.com/spreadsheets/d/1y5EAUQj8I5h87YXHiRqNsepDiyCrCfLOt1Tw6LDT5UI/edit?usp=sharing";

  //Tabletop.init({ key: polyURL, callback: addPolygons, simpleSheet: true });
  Tabletop.init({ key: pointsURL, callback: addPoints, simpleSheet: true }); // simpleSheet assumes there is only one table and automatically sends its data
}
window.addEventListener("DOMContentLoaded", init);

//Eventually when this is on the web this script should use Papa Parse rather than Tabletop because Google is going to remove
//the technology that Tabletop relies on (as of May 2020). Papa Parse only works for html on the web, not on a computer (apparently)
//the following script has not been tested
/*
function init() {
    console.log("fdsfsdd");      
    Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vRiGTeDXM1oyzNdPA97nKvYfwP1PmIvC6SuEwJas3TIfOX2487QrvAHkrKI79VZyEmY74QeynPsPmN5/pub?gid=0&single=true&output=csv', {
          download: true,
          header: true,
          complete: function(results) {
            var data = results.data;
            //addPoints(data);
            console.log(data);
          }
        });
}
window.addEventListener('DOMContentLoaded', init);
    */
    
    
var highlightLayer;
function highlightFeature(e) {
    highlightLayer = e.target;
      highlightLayer.setStyle({
        fillColor: '#ffff00',
        fillOpacity: 1
      });
}    

// Create a new Leaflet map centered on San Carlos
var map = L.map('map', {zoomControl:true, maxZoom:18, minZoom:1}).fitBounds([[37.4798,-122.3034],[37.5184,-122.2409]]);

var hash = new L.Hash(map);
map.attributionControl.setPrefix('<a href="https://www.csgengr.com/" target="_blank">CSG Consultants</a>&middot; <a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
var measureControl = new L.Control.Measure({
    position: 'topleft',
    primaryLengthUnit: 'feet',
    secondaryLengthUnit: 'miles',
    primaryAreaUnit: 'sqfeet',
    secondaryAreaUnit: 'sqmiles'
});
measureControl.addTo(map);

document.getElementsByClassName('leaflet-control-measure-toggle')[0].innerHTML = '';
document.getElementsByClassName('leaflet-control-measure-toggle')[0].className += ' fas fa-ruler';
var bounds_group = new L.featureGroup([]);

/*var layer_ESRIImagery_0 = L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png', {
    opacity: 1.0,
    attribution: '',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 18
});
//layer_ESRIImagery_0;
var layer_OpenStreetMap_1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    opacity: 1.0,
    attribution: '',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 19
});
//layer_OpenStreetMap_1;
map.addLayer(layer_OpenStreetMap_1);*/

var sidebar = L.control.sidebar({
    container: "sidebar",
    closeButton: true,
    position: "right"
  })
  .addTo(map);

let panelID = "my-info-panel";
var panelContent = {
  id: panelID,
  tab: "<i class='fa fa-bars active'></i>",
  pane: "<p id='sidebar-content'></p>",
  title: "<h2 id='sidebar-title'>No Project Selected</h2>"
};
sidebar.addPanel(panelContent);

map.on("click", function() {
  sidebar.close(panelID);
});

// These are declared outisde the functions so that the functions can check if they already exist
//var polygonLayer;
var pointGroupLayer;

// The form of data must be a JSON representation of a table as returned by Tabletop.js
// addPolygons first checks if the map layer has already been assigned, and if so, deletes it and makes a fresh one
// The assumption is that the locally stored JSONs will load before Tabletop.js can pull the external data from Google Sheets
function addPolygons(data) {
  if (polygonLayer != null) {
    // If the layer exists, remove it and continue to make a new one with data
    polygonLayer.remove();
  }

  // Need to convert the Tabletop.js JSON into a GeoJSON
  // Start with an empty GeoJSON of type FeatureCollection
  // All the rows will be inserted into a single GeoJSON
  var geojsonStates = {
    type: "FeatureCollection",
    features: []
  };

  for (var row in data) {
    // The Sheets data has a column 'include' that specifies if that row should be mapped
    if (data[row].include == "y") {
      var coords = JSON.parse(data[row].geometry);

      geojsonStates.features.push({
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: coords
        },
        properties: {
          name: data[row].name,
          summary: data[row].summary,
          state: data[row].state,
          local: data[row].local
        }
      });
    }
  }

  // The polygons are styled slightly differently on mouse hovers
  var polygonStyle = { color: "#2ca25f", fillColor: "#99d8c9", weight: 1.5 };
  var polygonHoverStyle = { color: "green", fillColor: "#2ca25f", weight: 3 };

  polygonLayer = L.geoJSON(geojsonStates, {
    onEachFeature: function(feature, layer) {
      layer.on({
        mouseout: function(e) {
          e.target.setStyle(polygonStyle);
        },
        mouseover: function(e) {
          e.target.setStyle(polygonHoverStyle);
        },
        click: function(e) {
          // This zooms the map to the clicked polygon
          // map.fitBounds(e.target.getBounds());

          // if this isn't added, then map.click is also fired!
          L.DomEvent.stopPropagation(e);

          document.getElementById("sidebar-title").innerHTML =
            e.target.feature.properties.name;
          document.getElementById("sidebar-content").innerHTML =
            e.target.feature.properties.summary;
          sidebar.open(panelID);
        }
      });
    },
    style: polygonStyle
  }).addTo(map);
}

// addPoints is a bit simpler, as no GeoJSON is needed for the points
// It does the same check to overwrite the existing points layer once the Google Sheets data comes along
function addPoints(data) {
  if (pointGroupLayer != null) {
    pointGroupLayer.remove();
  }
  pointGroupLayer = L.layerGroup().addTo(map);

  for (var row = 0; row < data.length; row++) {
    var marker;
    marker = L.circleMarker([data[row].lat, data[row].lon], style_pts(data[row].Status))
    marker.addTo(pointGroupLayer);

    // UNCOMMENT THIS LINE TO USE POPUPS
    /*marker.bindPopup('<b>Address: </b>' + data[row].Address + 
                     '<br><b>Review Type: </b>' + data[row].Review_Type_all +
                    '<br><b>APN: </b>' + data[row].APN_Real +
                    '<br><b>Review Date: </b>' + data[row].Rev_Date +
                    '<br><b>Review Status: </b>' + data[row].Status +
                    '<br><b>Regulated Project?: </b>' + data[row].Regulated_Project +
                    '<br><b>Comments (CSG): </b>' + data[row].Comments_CSG +
                    '<br><b>Comments (City): </b>' + data[row].Comments_City);*/
    
    marker.bindTooltip(data[row].Address, {permanent: false, opacity: 0.8});
    
      
    // COMMENT THE NEXT 14 LINES TO DISABLE SIDEBAR FOR THE MARKERS
    marker.feature = {
      properties: {
        APN_Parcel: data[row].APN_Parcel,
        Include: data[row].Include,
        Address: data[row].Address,
        APN_Real: data[row].APN_Real,
        Review_Type_all: data[row].Review_Type_all,
        Review_Type1: data[row].Review_Type1,
        Review_Type2: data[row].Review_Type2,
        Review_Type3: data[row].Review_Type3,
        Review_Type4: data[row].Review_Type4,
        Review_Type5: data[row].Review_Type5,
        Rev_Date: data[row].Rev_Date,
        Status: data[row].Status,
        Regulated_Project: data[row].Regulated_Project,
        acres: data[row].acres,
        lat: data[row].lat,
        lon: data[row].lon,
        Comments_CSG: data[row].Comments_CSG,
        Comments_City: data[row].Comments_City,
        File_Path: data[row].File_Path,
        Photo: data[row].Photo
      }
    };
    marker.on({
      click: function(e) {
        L.DomEvent.stopPropagation(e);
        document.getElementById("sidebar-title").innerHTML = e.target.feature.properties.Address;
        document.getElementById("sidebar-content").innerHTML = "<TABLE>" +          
            "<TR><TD><b>Include Project on Map?: </b></TD><TD>" + e.target.feature.properties.Include + "</TD></TR>" +  
            "<TR><TD><b>Address: </b></TD><TD>" + e.target.feature.properties.Address + "</TD></TR>" +  
            "<TR><TD><b>APN from Parcel GIS Layer: </b></TD><TD>" + e.target.feature.properties.APN_Parcel + "</TD></TR>" +  
            "<TR><TD><b>APN in Review Data: </b></TD><TD>" + e.target.feature.properties.APN_Real + "</TD></TR>" +  
            "<TR><TD><b>Review Type 1: </b></TD><TD>" + e.target.feature.properties.Review_Type1 + "</TD></TR>" +  
            "<TR><TD><b>Review Type 2: </b></TD><TD>" + e.target.feature.properties.Review_Type2 + "</TD></TR>" +  
            "<TR><TD><b>Review Type 3: </b></TD><TD>" + e.target.feature.properties.Review_Type3 + "</TD></TR>" +  
            "<TR><TD><b>Review Type 4: </b></TD><TD>" + e.target.feature.properties.Review_Type4 + "</TD></TR>" +  
            "<TR><TD><b>Review Type 5: </b></TD><TD>" + e.target.feature.properties.Review_Type5 + "</TD></TR>" +  
            "<TR><TD><b>Review Date: </b></TD><TD>" + e.target.feature.properties.Rev_Date + "</TD></TR>" +  
            "<TR><TD><b>Status: </b></TD><TD>" + e.target.feature.properties.Status + "</TD></TR>" +  
            "<TR><TD width='150'><b>Regulated Project?: </b></TD><TD>" + e.target.feature.properties.Regulated_Project + "</TD></TR>" +  
            "<TR><TD><b>Area of Parcel (acres): </b></TD><TD>" + e.target.feature.properties.acres + "</TD></TR>" +  
            "<TR><TD><b>Latitude: </b></TD><TD>" + e.target.feature.properties.lat + "</TD></TR>" +  
            "<TR><TD><b>Longitude: </b></TD><TD>" + e.target.feature.properties.lon + "</TD></TR>" +  
            "<TR><TD><b>Comments from CSG: </b></TD><TD>" + e.target.feature.properties.Comments_CSG + "</TD></TR>" +  
            "<TR><TD><b>Comments from City: </b></TD><TD>" + e.target.feature.properties.Comments_City + "</TD></TR>" +  
            "<TR><TD><b>File Path CSG: </b></TD><TD>" + e.target.feature.properties.File_Path + "</TD></TR>" + 
            /*"<TR><TD colspan='2'> <img src=" + e.target.feature.properties.Photo + " width='250'></TD></TR>" +*/  
            "</TABLE>";
          
        sidebar.open(panelID);
      }
    });
    /*marker.on({
        mouseout: style_pts(data[row].Status),
        mouseover: highlightFeature,
    });*/

    // AwesomeMarkers is used to create fancier icons
    /*var icon = L.AwesomeMarkers.icon({
      icon: "info-sign",
      iconColor: "white",
      markerColor: getColor(data[row].Status),
      prefix: "glyphicon",
      extraClasses: "fa-rotate-0"
    });
    if (!markerType.includes("circle")) {
      marker.setIcon(icon);
    }*/
  }
}


// Returns different colors depending on the string passed
// Used for the points layer
function style_pts(status) {
    switch(status) {
        case 'ACTIVE':
            return {
        radius: 8.0,
        opacity: 1,
        color: 'rgba(128,17,25,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 2.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(219,30,42,1.0)',
        interactive: true,
    }
            break;
        case 'COMPLETE':
            return {
        radius: 8.0,
        opacity: 1,
        color: 'rgba(0,0,0,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 2.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(30,153,219,1.0)',
        interactive: true,
    }
            break;
        case 'PENDING':
            return {
        radius: 8.0,
        opacity: 1,
        color: 'rgba(0,0,0,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 2.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(215,219,101,1.0)',
        interactive: true,
    }
            break;
        case '':
            return {
        radius: 8.0,
        opacity: 1,
        color: 'rgba(0,0,0,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 2.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(148,148,148,1.0)',
        interactive: true,
    }
            break;
        default: 
            return {
        radius: 8.0,
        opacity: 1,
        color: 'rgba(0,0,0,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 2.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(200,200,200,1.0)',
        interactive: true,
    }
            break;
    }
}

var abstract = new L.Control({'position':'bottomleft'});
abstract.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'leaflet-control leaflet-bar abstract');
    this._div.id = 'abstract'

        abstract.show();
        return this._div;
};
abstract.show = function () {
    this._div.classList.remove("abstract");
    this._div.classList.add("abstractUncollapsed");
    this._div.innerHTML = 'San Carlos Development Review Map';
};
abstract.addTo(map);


var osmGeocoder = new L.Control.Geocoder({
    collapsed: true,
    position: 'topleft',
    text: 'Search',
    title: 'Testing'
}).addTo(map);
document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
.className += ' fa fa-search';
document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
.title += 'Search for a place';


//var baseMaps = {};
//L.control.layers(baseMaps,{'Development Status Points<br /><table><tr><td style="text-align: center;"><img src="legend/DevelopmentStatusPoints_3_ACTIVE0.png" /></td><td>ACTIVE</td></tr><tr><td style="text-align: center;"><img src="legend/DevelopmentStatusPoints_3_COMPLETE1.png" /></td><td>COMPLETE</td></tr><tr><td style="text-align: center;"><img src="legend/DevelopmentStatusPoints_3_PENDING2.png" /></td><td>PENDING</td></tr><tr><td style="text-align: center;"><img src="legend/DevelopmentStatusPoints_3_3.png" /></td><td></td></tr></table>': pointGroupLayer,"OpenStreetMap": layer_OpenStreetMap_1,"ESRI Imagery": layer_ESRIImagery_0,},{collapsed:false}).addTo(map);


//L.control.layers(baseMaps,{"OpenStreetMap": layer_OpenStreetMap_1,"ESRI Imagery": layer_ESRIImagery_0,},{collapsed:false}).addTo(map);

var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWUyZGV2IiwiYSI6ImNqaWdsMXJvdTE4azIzcXFscTB1Nmcwcm4ifQ.hECfwyQtM7RtkBtydKpc5g';

var grayscale = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
  satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite',   attribution: mbAttr}),
  streets = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

map.addLayer(streets);
baseLayers = {
    "Grayscale": grayscale,
    "Aerial": satellite,
    "Streets": streets
};


//lyrCities = L.geoJSON.ajax('data/SMC_Cities.geojson', {style:{color:'gray', fillOpacity:0}});// .addTo(mymap);
//lyrParcels = L.geoJSON.ajax('data/SMC_Parcels_San_Carlos.geojson', {style:{color:'black', fillOpacity:0}}); //.addTo(mymap);
//lyrWatersheds = L.geoJSON.ajax('data/SMC_watersheds.geojson', {style:{color:'deepskyblue'}}); //.addTo(mymap);
lyrCreeks = L.geoJSON.ajax('data/SMC_Creeks.geojson', {style:{color:'steelblue'}}).addTo(map);


    
/*
function popUp(f,l){
    var out = [];
    if (f.properties){
        for(key in f.properties){
            out.push(key+": "+f.properties[key]);
        }
        l.bindPopup(out.join("<br />"));
    }
}


var jsonTest = new L.GeoJSON.AJAX(["data/SMC_Creeks.geojson","data/SMC_watersheds.geojson"],{onEachFeature:popUp}).addTo(map);*/

/*overlays = {
    "City Boundaries":lyrCities,
    "Watersheds":lyrWatersheds,
    "Creeks":lyrCreeks,
    "Parcels":lyrParcels    
};*/

overlays = {
    "Creeks":lyrCreeks   
};

L.control.layers(baseLayers, overlays, {collapsed : false}).addTo(map);

/*function addLegend(scale, scaleType, title) {
    var svg = d3.select("#legend")
      .append("svg")
        .style("width", 300)
        .style("height", 300);

    svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(20,20)");

    var legend = d3.legendColor()
      .labelFormat(d3.format(".2f"))
      .title(title);

    if (scaleType === "scaleThreshold") {
      legend = legend.labels(d3.legendHelpers.thresholdLabels);
    }

    legend.scale(scale);  

    svg.select("g.legend")
      .call(legend);
}*/










