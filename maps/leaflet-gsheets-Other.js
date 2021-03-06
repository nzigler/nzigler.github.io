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
    var pointsURL = "https://docs.google.com/spreadsheets/d/1DedPJ9kQjMB3RaZ604VbVdfRvG40HbqpYBSGMUOjFfA/edit?usp=sharing";

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
var map = L.map('map', {zoomControl:true, maxZoom:18, minZoom:1}).fitBounds([[37.48,-122.3034],[37.53,-122.2409]]);

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
     if (data[row].Include == "Yes" || data[row].Include == "yes" || data[row].Include == "Y" || data[row].Include == "y" ) { 
        var marker;
        marker = L.circleMarker([data[row].Latitude, data[row].Longitude], style_pts(data[row].Status))
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
            APN_Parcel_GIS_Layer: data[row].APN_Parcel_GIS_Layer,
            Include: data[row].Include,
            Address: data[row].Address,
            APN_From_Review: data[row].APN_From_Review,
            Review_Type1: data[row].Review_Type1,
            Review_Type2: data[row].Review_Type2,
            Review_Type3: data[row].Review_Type3,
            Review_Type4: data[row].Review_Type4,
            Review_Type5: data[row].Review_Type5,
            Review_Date: data[row].Review_Date,
            Status: data[row].Status,
            C3_Regulated_Project: data[row].C3_Regulated_Project,
            Small_Project_Provision_C3i: data[row].Small_Project_Provision_C3i,
            Greater_Than_1_Acre: data[row].Greater_Than_1_Acre,
            Latitude: data[row].Latitude,
            Longitude: data[row].Longitude,
            Description: data[row].Project_Description,
            Comments_CSG: data[row].Comments_CSG,
            Comments_City: data[row].Comments_City,
            File_Path: data[row].File_Path,
            Photo1: data[row].Photo1,
            Doc1: data[row].Doc1
          }
        };
        marker.on({
          click: function(e) {
            L.DomEvent.stopPropagation(e);
            document.getElementById("sidebar-title").innerHTML = e.target.feature.properties.Address;
            document.getElementById("sidebar-content").innerHTML = "<TABLE>" +          
                "<TR><TD><b>Include Project on Map?: </b></TD><TD>" + e.target.feature.properties.Include + "</TD></TR>" +  
                "<TR><TD><b>Address: </b></TD><TD>" + e.target.feature.properties.Address + "</TD></TR>" +  
                "<TR><TD><b>APN from Parcel GIS Layer: </b></TD><TD>" + e.target.feature.properties.APN_Parcel_GIS_Layer + "</TD></TR>" +  
                "<TR><TD><b>APN in Review Data: </b></TD><TD>" + e.target.feature.properties.APN_From_Review + "</TD></TR>" +  
                "<TR><TD><b>Review Type 1: </b></TD><TD>" + e.target.feature.properties.Review_Type1 + "</TD></TR>" +  
                "<TR><TD><b>Review Type 2: </b></TD><TD>" + e.target.feature.properties.Review_Type2 + "</TD></TR>" +  
                "<TR><TD><b>Review Type 3: </b></TD><TD>" + e.target.feature.properties.Review_Type3 + "</TD></TR>" +  
                "<TR><TD><b>Review Type 4: </b></TD><TD>" + e.target.feature.properties.Review_Type4 + "</TD></TR>" +  
                "<TR><TD><b>Review Type 5: </b></TD><TD>" + e.target.feature.properties.Review_Type5 + "</TD></TR>" +  
                "<TR><TD><b>Review Date: </b></TD><TD>" + e.target.feature.properties.Review_Date + "</TD></TR>" +  
                "<TR><TD><b>Status: </b></TD><TD>" + e.target.feature.properties.Status + "</TD></TR>" +  
                "<TR><TD><b>C3 Regulated Project?: </b></TD><TD>" + e.target.feature.properties.C3_Regulated_Project + "</TD></TR>" +  
                "<TR><TD><b>Small Project (Provision C.3.i)?: </b></TD><TD>" + e.target.feature.properties.Small_Project_Provision_C3i + "</TD></TR>" +
                "<TR><TD><b>>1 acre?: </b></TD><TD>" + e.target.feature.properties.Greater_Than_1_Acre + "</TD></TR>" +  
                "<TR><TD><b>Latitude: </b></TD><TD>" + e.target.feature.properties.Latitude + "</TD></TR>" +  
                "<TR><TD><b>Project Description: </b></TD><TD>" + e.target.feature.properties.Description + "</TD></TR>" + 
                "<TR><TD><b>Longitude: </b></TD><TD>" + e.target.feature.properties.Longitude + "</TD></TR>" +  
                "<TR><TD><b>Comments from CSG: </b></TD><TD>" + e.target.feature.properties.Comments_CSG + "</TD></TR>" +  
                "<TR><TD><b>Comments from City: </b></TD><TD>" + e.target.feature.properties.Comments_City + "</TD></TR>" +  
                "<TR><TD><b>File Path CSG: </b></TD><TD>" + e.target.feature.properties.File_Path + "</TD></TR>" +             
                "<TR><TD><b>Project Document: </b></TD><TD><a href='docs/" + e.target.feature.properties.Doc1 + "' >" + e.target.feature.properties.Doc1 + "</a></TD></TR>" +
                "<TR><TD><b>Project Photo: </b></TD><TD><a href='photos/" + e.target.feature.properties.Photo1 + "' >" + e.target.feature.properties.Photo1 + "</a></TD></TR>" +
                /*"<TR><TD colspan='2'> <a href='photos/" + e.target.feature.properties.Photo1 + "' target='_blank'><img src='photos/" + e.target.feature.properties.Photo1 + "' width='320'></a></TD></TR>" +*/

                "</TABLE>";

                 /*if (e.target.feature.properties.Photo1) {
                    document.getElementById("sidebar-content").innerHTML += "<TR><TD colspan='2'> <a href='photos/" + e.target.feature.properties.Photo1 + "' target='_blank'><img src='photos/" + e.target.feature.properties.Photo1 + "' width='320'></a></TD></TR>"; 
                }*/


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
}


// Returns different colors depending on the string passed
// Used for the points layer
function style_pts(status) {
    switch(status) {
        case 'ACTIVE':
            return {
        radius: 8.0,
        opacity: 0.7,
        color: 'rgb(20,20,20)',
        weight: 1.4,
        fillOpacity: 0.7,
        fillColor: 'rgb(219,0,0)'
    }
            break;
        case 'COMPLETE':
            return {
        radius: 8.0,
        opacity: 0.7,
        color: 'rgb(20,20,20)',
        weight: 1.4,
        fillOpacity: 0.7,
        fillColor: 'rgb(0,0,255)'
    }
            break;
        case 'PENDING':
            return {
        radius: 8.0,
        opacity: 0.7,
        color: 'rgb(20,20,20)',
        weight: 1.4,
        fillOpacity: 0.7,
        fillColor: 'rgb(255,255,0)'
    }
            break;
        case '':
            return {
        radius: 8.0,
        opacity: 0.7,
        color: 'rgb(20,20,20)',
        weight: 1.4,
        fillOpacity: 0.7,
        fillColor: 'rgb(148,148,148)'
    }
            break;
        default: 
            return {
        radius: 8.0,
        opacity: 0.7,
        color: 'rgb(20,20,20)',
        weight: 1.4,
        fillOpacity: 0.7,
        fillColor: 'rgb(200,200,200)'
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
    this._div.innerHTML = 'Title Here';
};
abstract.addTo(map);

var ctlMouseposition = L.control.mousePosition({position: 'bottomleft'}).addTo(map);

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


lyrCities = L.geoJSON.ajax('data/SMC_Cities_lines.geojson', {style:{color:'yellow', fillOpacity:0}});// .addTo(map);
lyrParcels = L.geoJSON.ajax('data/SMC_Parcels_San_Carlos_lines_reduced.geojson', {style:{color:'white', fillOpacity:0, weight:1.5}}); //.addTo(map);
lyrCreeks = L.geoJSON.ajax('data/SMC_Creeks.geojson', {style:{color:'aqua'}});//.addTo(map);

map.on("overlayadd", function (event) {
  init();
});

overlays = {
    "City Boundaries":lyrCities,
    "Creeks":lyrCreeks,
    "Parcels":lyrParcels    
};



L.control.layers(baseLayers, overlays, {collapsed : false}).addTo(map);



function getRadius(r) {
    return  r > 100 ? 12 :
            r > 50 ? 9 :
            r > 20 ? 6 :
            r > 10 ? 4 :
            0;
}

 var legend = L.control({position: 'bottomright'});

 /*legend.onAdd = function (map) {

     var div = L.DomUtil.create('div', 'info legend');
     grades = [15, 40, 80, 400],
     labels = ['<strong>Amount of units</strong>'],
     categories = ['N/A','<50','51-100', '>100'];

     for (var i = 0; i < grades.length; i++) {
            var grade = grades[i];//*0.5;
       labels.push(
            '<i class="circlepadding" style="width: '+Math.max(8,(7-2.2*getRadius(grade)))+'px;"></i> <i style="background: #8080A0; width: '+getRadius(grade)*2+'px; height: '+getRadius(grade)*2+'px; border-radius: 50%; margin-top: '+Math.max(0,(9-getRadius(grade)))+'px;"></i><i class="circlepadding" style="width: '+Math.max(2,(25-2*getRadius(grade)))+'px;"></i> ' + categories[i]);
       }
     div.innerHTML = labels.join('<br>');
     return div;
 };
 legend.addTo(map);*/


legend.onAdd = function (map) {

     var div = L.DomUtil.create('div', 'info legend');
     div.innerHTML = '<b> Project Status</b><br>'+ 
        '<svg height="85" width="115">' +
            '<ellipse cx="18" cy="16" rx="7" ry="7" style="stroke-width: 1.2; stroke: black;  fill: red; fill-opacity:0.8;"/>' +
            '<text x="40" y="20" font-size: 12px>Active</text>' +
            '<ellipse cx="18" cy="36" rx="7" ry="7" style="stroke-width: 1.2; stroke: black;  fill: blue; fill-opacity:0.8;"/>' +
            '<text x="40" y="40" font-size: 12px>Complete</text>' +
            '<ellipse cx="18" cy="56" rx="7" ry="7" style="stroke-width: 1.2; stroke: black;  fill: yellow; fill-opacity:0.8;"/>' +
            '<text x="40" y="60" font-size: 12px>Pending</text>' +
            '<ellipse cx="18" cy="76" rx="7" ry="7" style="stroke-width: 1.2; stroke: black;  fill: gray; fill-opacity:0.8;"/>' +
            '<text x="40" y="80" font-size: 12px>blank</text>' +
            
        '</svg>';
     return div;
 };
 legend.addTo(map);




/*var legend = L.control({position: 'topright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
   '<b> Project Type: </b><br>'+ 
        '<svg height="100" width="180">' +
            '<rect x="6" y="10" width="25" height="20" style="stroke-width: 3; stroke: limegreen;  fill: limegreen; fill-opacity:0.5;"/>' +
            '<text x="40" y="25" style="font-family: sans-serif; font-size: 12px;">Parcel-based</text>' +
            '<rect x="6" y="40" width="25" height="20" style="stroke-width: 3; stroke: blue; fill: blue; fill-opacity:0.5;"/>' +
            '<text x="40" y="55" style="font-family: sans-serif; font-size: 12px;">Green Street</text>' +
            '<rect x="6" y="70" width="25" height="20" style="stroke-width: 3; stroke: yellow; fill: yellow; fill-opacity:0.5;"/>' +
            '<text x="40" y="85" style="font-family: sans-serif; font-size: 12px;">Regional Project</text>' +
        '</svg>';
    return div;
}*/






