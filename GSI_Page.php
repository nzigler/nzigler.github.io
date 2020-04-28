

<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta name="author" content="Michaela Palmer">
<title>SCVURPPP GSI Database - Map</title>
<link rel="shortcut icon" type="image/png" href="../images/h2o.png">

<!--CSS-->
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.css">

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    
    <link rel="stylesheet" href="src/plugins/L.Control.MousePosition.css">
    <link rel="stylesheet" href="src/plugins/Leaflet.PolylineMeasure.css">
    <link rel="stylesheet" href="src/plugins/easy-button.css">
    <link rel="stylesheet" href="src/plugins/L.Control.Sidebar.css">

    <link rel="stylesheet" href="src/css/font-awesome.min.css">
    <link rel="stylesheet" href="src/plugins/leaflet.awesome-markers.css">
    <link rel="stylesheet" href="src/plugins/leaflet-legend.css">
    <link rel="stylesheet" href="src/jquery-ui.min.css">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
crossorigin=""/>


<!--JS-->

    <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
crossorigin=""></script>

    <script src="src/jquery-3.2.0.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBKlvw0akMQnS_RB9WIfkVg84P_LyohaiU" async defer></script>
    <script src='https://unpkg.com/leaflet.gridlayer.googlemutant@latest/Leaflet.GoogleMutant.js'></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.css">
    <script src="src/plugins/L.Control.MousePosition.js"></script>
    <script src="src/plugins/Leaflet.PolylineMeasure.js"></script>
    <script src="src/plugins/easy-button.js"></script>
    <script src="src/plugins/L.Control.Sidebar.js"></script>

    <script src="src/plugins/leaflet-providers.js"></script>

    <script src="src/plugins/leaflet.ajax.min.js"></script>
    <script src="src/plugins/leaflet.sprite.js"></script>
    <script src="src/plugins/leaflet.awesome-markers.min.js"></script>
    <script src="src/jquery-ui.min.js"></script>
    <script src="src/plugins/leaflet-legend.js"></script>
    <script src="src/plugins/leaflet.geometryutil.js"></script>






    <style>
    
      #mapdiv {
            height:91vh;
        }
        .col-xs-12, .col-xs-6, .col-xs-4 {
            padding:2.5px;
        }
        #divProject {
            background-color: whitesmoke;
        }
        .errorMsg {
            padding:0;
            text-align:center;
            background-color:whitesmoke;    
        }
    
         
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      
   
          .leaflet-control-layers {
            width:140px !important;
         }
    

 
 .hide {
   display: none !important;
   
 }    
    
 
.dropdown-item:active {
    background: transparent !important;
    color: #007bff !important;
}
	
.nav-link {
    display: block;
    font-weight: normal !important;
    color: white !important;
    text-transform: uppercase;
    font-size: 16px;
}

.nav-link:hover {
    color: #ccc !important;
}

.nav-link:not(.dropdown-toggle)::after  {
    content: '' !important;
    display: block !important;
    height: 2px !important; 
	width: 0 !important;
	bottom: 0px !important; 
	
    background: #007bff !important;
    transition: width .2s !important;
}


.nav-link:not(.dropdown-toggle):hover::after {
    width: 100% !important;
}


.dropdown-menu {
    overflow: visible !important;
    position: relative;
    z-index: 10000;
    
}

.dropdown-item {
    font-weight: normal !important;
    
 
}

.mb-3, .my-3 {
     margin-bottom: .25rem !important; 
}


.dropdown-item::after  {
    content: '' !important;
    display: block !important;
    height: 2px !important; 
	width: 0 !important;
	bottom: 0px !important; 
	
    background: #007bff !important;
    transition: width .2s !important;
}

.dropdown-item:hover::after {
    width: 100% !important;
}

.navbar-nav li:hover .dropdown-menu {
    display: block;}
   


.navbar {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
  
  }
  
  .leaflet-sidebar > .leaflet-control {
      width: 101%;
      padding: 6px 24px;
      background: whitesmoke !important;
     
  }
  
  h2, .h2 {
      font-size: 1.05rem !important;
  }
  
  
  .form-control-sm {
      font-size: 0.75rem !important; 
  }
  
  .btn-sm, .btn-group-sm > .btn {
       padding: 0.25rem 0.5rem;
     font-size: 0.75rem; 
  }
  
  h3, .h3 {
    font-size: .8rem;
    font-weight: 600;
}
  
.btn-circle {
      color: #fff;
      background: rgba(0, 123, 255,.9) !important;
      height: 55px;
      width: 55px;
      border-radius: 50% !important;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2) !important;
      position: fixed;
       overflow: visible !important;
       z-index: 10000;
      bottom: 24px;
      right: 50;}    

 .btn-circle:hover{
  color: #fff !important;
  background-color:#0062cc !important; 
  border-color: #0062cc !important;
}
    div.modal-dialog {
    max-width: 100%;
    width: 50%;
    font: 85%
    }
    
    
    body {
    font-size: 14px;
	margin: 0;
	overflow-y:scroll;
	padding: 0;
	color: #333;
	background-color: #fff;
}


    
    
    .legend {
	   	position:relative;
	    color: #333;
	    border-radius: 0.25rem;
	    background: #fff;
	    box-shadow: 0 1px 5px rgba(0,0,0,0.4);
	    padding:6px 10px 6px 6px;
	    width: 140px;
    }
	.legend i {
	    display: block;
	}
	

       </style>
    
    <script> 
    $(function(){
      $("#includedContent").load("content.html"); 
    });
    </script> 
        
</head>
<!--Navbar-->
<nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <a href="../home.php" class="navbar-brand" title="SCVURPPP">
                   <img style="max-width:335px; margin-top: -8px;"src="../images/logo1.png"> </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="../home.php" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">
          Menu
        </a>
        
        <div class="dropdown-menu mt-0" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="/map">View Map of Projects</a>
          <a class="dropdown-item" href="../scc_gsi.php?user=Public">Browse/Edit/Upload Project Data</a>
          <a class="dropdown-item hide" href="../download">Download Project Data</a>
          <a class="dropdown-item" href="#">GSI Dashboard</a>
        </div>
      </li>
                
                
                <li class="nav-item">
                    <a class="nav-link" href="#" data-toggle="modal" data-target="#modal">About<span class="caret"></span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../guidance/">Guidance</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../contact/">Contact</a>
                </li>
                 <li class="nav-item">
                    <a class="nav-link hide" href="../logout.php">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="accountModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="accountModalLabel">What is Green Stormwater Infrastructure?</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
            <div class="modal-body">
                <div id="includedContent"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<!--Navbar-->
  <div id="side-bar">
        <!--button id="btnShowsLegend" class='btn btn-primary btn-sm'>Show Legend</button-->
           <div id="legend">
            <div id="lgndLID">
                <!--h3 class="text-center">GSI Projects 
                <!--i id="btnGSIProjects" class="fa fa-bars"></i-->

        <!--i id="btnGSIProjects" class="material-icons">menu</i>
                
                
            
        </div>
        <div id="divProject">
            <div id="divProjectLabel" class="text-center col-xs-12">
                <!--h2 id="lblProject">GSI Projects Santa Clara County</h2><hr-->
                   <!--button id='btnLocate' class='btn btn-primary btn-block btn-sm'>Locate</button-->
                
            </div>
            
            
            <!--<div id="divProjectError" class="errorMsg col-xs-12"></div>-->
            <!--div id="divFindProject" class="form-group has-error">
                <div class="col-xs-6">
                    <input type="text" id="txtFindProject" class="form-control" placeholder="Search Project Name">
                </div>
                <div class="col-xs-6">
                    <button id="btnFindProject" class="btn btn-primary btn-sm">Find Project</button>
                </div>
            </div-->
            
            
            
            <div id="divFindProject" class="form-group has-error">
                <div class="row">
                <div class="col-9">
                <input type="text" id="txtFindProject" class="form-control form-control-sm" placeholder="Search Project Name">
                </div>
                <div class="col-3">   
                <button id="btnFindProject" class="btn btn-primary btn-sm">Find Project</button>
                </div>
                </div>
                </div>
              
        
                <div id="divFilterProject">
                <hr><h3>Permittee</h3>
                <div class="row">
                
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckA" name='fltPermittee' value='Campbell' checked>
                <label class="custom-control-label" for="customCheckA">Campbell</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckB" name='fltPermittee' value='Cupertino' checked>
                <label class="custom-control-label" for="customCheckB">Cupertino</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckC" name='fltPermittee' value='Los_Gatos' checked>
                <label class="custom-control-label" for="customCheckC">Los Gatos</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckD" name='fltPermittee' value='Los_Altos' checked>
                <label class="custom-control-label" for="customCheckD">Los Altos</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckE" name='fltPermittee' value='Los_Altos_Hills' checked>
                <label class="custom-control-label" for="customCheckE">Los Altos Hills</label>
                </div>
                </div>
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckF" name='fltPermittee' value='Milpitas' checked>
                <label class="custom-control-label" for="customCheckF">Milpitas</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckG" name='fltPermittee' value='Monte_Sereno' checked>
                <label class="custom-control-label" for="customCheckG">Monte Sereno</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckH" name='fltPermittee' value='Mountain_View' checked>
                <label class="custom-control-label" for="customCheckH">Mountain View</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckI" name='fltPermittee' value='Palo_Alto' checked>
                <label class="custom-control-label" for="customCheckI">Palo Alto</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckJ" name='fltPermittee' value='San_Jose' checked>
                <label class="custom-control-label" for="customCheckJ">San Jose</label>
                </div>
                </div>
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckK" name='fltPermittee' value='Santa_Clara' checked>
                <label class="custom-control-label" for="customCheckK">Santa Clara</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckL" name='fltPermittee' value='Santa_Clara_County' checked>
                <label class="custom-control-label" for="customCheckL">Santa Clara County</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckM" name='fltPermittee' value='Saratoga' checked>
                <label class="custom-control-label" for="customCheckM">Saratoga</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckN" name='fltPermittee' value='Sunnyvale' checked>
                <label class="custom-control-label" for="customCheckN">Sunnyvale</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheckO" name='fltPermittee' value='Other' checked>
                <label class="custom-control-label" for="customCheckO">Other</label>
                </div>
                </div>
                
                
                
                
                
                
                
                
                
                
                </div>
                
                <button id="btnPermitteeFilterAll" class="btn btn-primary btn-sm">Check All</button>
                <button id="btnPermitteeFilterNone" class="btn btn-primary btn-sm">Uncheck All</button><br>
                
                <hr>
                
                <div class="row">
                
                <div class="col-sm">
                <h3>C.3 Regulated?</h3>
                </div> 
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheck" name='fltRegulated' value='C3_Yes' checked>
                <label class="custom-control-label" for="customCheck">Yes</label>
                </div>
                </div>
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheck1" name='fltRegulated' value='C3_No' checked>
                <label class="custom-control-label" for="customCheck1">No</label>
                </div>
                </div>
                
                </div>
            
                <hr>
            
                <div class="row">
                
                <div class="col-sm">
                <h3>Project Status?</h3>
                </div>
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheck2" name='fltStatus' value='Constructed' checked>
                <label class="custom-control-label" for="customCheck2">Constructed</label>
                </div>
                </div>
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheck3" name='fltStatus' value='Under_Construction' checked>
                <label class="custom-control-label" for="customCheck3">Under Construction</label>
                </div>
                </div>
                </div>
                
                <hr>
                
                <div class="row">
                
                <div class="col-sm">
                <h3>Public/Private?</h3>
                </div>
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheck4" name='fltPubPriv' value='Public' checked>
                <label class="custom-control-label" for="customCheck4">Public</label>
                </div>
                </div>
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheck5" name='fltPubPriv' value='Private' checked>
                <label class="custom-control-label" for="customCheck5">Private</label>
                </div>
                </div>
                
                </div>
                
                <hr>
                
                <h3>Treatment Category?</h3>
                <div class="row">
                
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheck5" name='fltTrmnt_cat' value='LID' checked>
                <label class="custom-control-label" for="customCheck5">LID</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheck6" name='fltTrmnt_cat' value='Both' checked>
                <label class="custom-control-label" for="customCheck6">Both LID and Non-LID</label>
                </div>
                </div>
                    
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheck7" name='fltTrmnt_cat' value='NonLID' checked>
                <label class="custom-control-label" for="customCheck7">Non-LID</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheck8" name='fltTrmnt_cat' value='None' checked>
                <label class="custom-control-label" for="customCheck8">No Treatment</label>
                </div>
                </div>
                
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheck9" name='fltTrmnt_cat' value='Unk' checked>
                <label class="custom-control-label" for="customCheck9">Unknown</label>
                </div>
                </div>
                
                
                    
                </div>
                <hr>
                
                <h3>Project Type?</h3>
                <div class="row">
                    
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheck10" name='fltProjType' value='Parcel_Based' checked>
                <label class="custom-control-label" for="customCheck10">Parcel-Based</label>
                </div>
                </div>
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheck11" name='fltProjType' value='Green_Street' checked>
                <label class="custom-control-label" for="customCheck11">Green Street</label>
                </div>
                </div>
                <div class="col-sm">
                <div class="custom-control custom-checkbox mb-3">
                <input type='checkbox' class="custom-control-input" id="customCheck11" name='fltProjType' value='Regional' checked>
                <label class="custom-control-label" for="customCheck11">Regional</label>
                </div>
                </div>
                
                </div>
                
                <hr>
         
                
                
                <h3>Fiscal Year Completed?</h3>
                 <div class="row">
                     <div class="col-sm">
      
       <!--label for="startFY">Start</label-->
    <select class="form-control form-control-sm" id="startFY">
                       <!-- Start: <select id='startFY'-->
                         <option value="Start" selected disabled>Start</option>
                        <option value="FY0203" >FY02-03</option>
                        <option value="FY0304">FY03-04</option>
                        <option value="FY0405">FY04-05</option>
                        <option value="FY0506">FY05-06</option>
                        <option value="FY0607">FY06-07</option>
                        <option value="FY0708">FY07-08</option>
                        <option value="FY0809">FY08-09</option>
                        <option value="FY0910">FY09-10</option>
                        <option value="FY1011">FY10-11</option>
                        <option value="FY1112">FY11-12</option>
                        <option value="FY1213">FY12-13</option>
                        <option value="FY1314">FY13-14</option>
                        <option value="FY1415">FY14-15</option>
                        <option value="FY1516">FY15-16</option>
                        <option value="FY1617">FY16-17</option>
                        <option value="FY1718">FY17-18</option>
                        <option value="FY1819">FY18-19</option>
                        <option value="FY1920">FY19-20</option>
                        <option value="FY2021">FY20-21</option>
                        <option value="FY2122">FY21-22</option>
                        <option value="FY2223">FY22-23</option>
                    </select> 
                </div>
                <div class="col-sm">
                  <!--  End: <select id='endFY'-->
                         <select class="form-control form-control-sm" id="endFY">
                         <option value="End" selected disabled >End</option>
                        <option value="FY0203">FY02-03</option>
                        <option value="FY0304">FY03-04</option>
                        <option value="FY0405">FY04-05</option>
                        <option value="FY0506">FY05-06</option>
                        <option value="FY0607">FY06-07</option>
                        <option value="FY0708">FY07-08</option>
                        <option value="FY0809">FY08-09</option>
                        <option value="FY0910">FY09-10</option>
                        <option value="FY1011">FY10-11</option>
                        <option value="FY1112">FY11-12</option>
                        <option value="FY1213">FY12-13</option>
                        <option value="FY1314">FY13-14</option>
                        <option value="FY1415">FY14-15</option>
                        <option value="FY1516">FY15-16</option>
                        <option value="FY1617">FY16-17</option>
                        <option value="FY1718">FY17-18</option>
                        <option value="FY1819">FY18-19</option>
                        <option value="FY1920">FY19-20</option>
                        <option value="FY2021">FY20-21</option>
                        <option value="FY2122">FY21-22</option>
                        <option value="FY2223">FY22-23</option>
                    </select>
                </div>
                </div>
                </div>
                <div class="col-sm">
                </div>
                <div><br><button id="btnFilter" class="btn btn-primary btn-block btn-sm">Filter</button></div>
            </div>
        </div>

    </div>
    <div id="mapdiv" class="col-md-12"></div>
 
    <script>
        var mymap;
        //var lyrOSM;
        //var lyrTopo;
        var lyrImagery;
        var hybridMutant;
        var roadMutant;
        
        var lyrLID;
        var lyrSearch;
        var mrkCurrentLocation;

        var ctlAttribute;
        var ctlScale;
        var ctlMouseposition;
        var ctlMeasure;
        var ctlEasybutton;
        var ctlSidebar;

        var ctlLayers;
        
        var objBasemaps;
        var objOverlays;
        var GSIProjectNames = [];
        
        $(document).ready(function(){
        
            // ***************** Map Initialization *****************
            
            mymap = L.map('mapdiv', {center:[37.33, -121.95], zoom:12, attributionControl:false});
            
            ctlSidebar = L.control.sidebar('side-bar', {}).addTo(mymap);
            ctlEasybutton = L.easyButton('fa-cog fa-2x', function() {
                ctlSidebar.toggle();
            }).addTo(mymap);
           
            ctlAttribute = L.control.attribution({position:'bottomleft'}).addTo(mymap);
          //  ctlAttribute.addAttribution('<a href="http://www.eoainc.com">EOA, Inc.</a>');
        //    ctlAttribute.addAttribution('<a href="http://www.scvurppp.org/">SCVURPPP</a>')
            
            ctlScale = L.control.scale({position:'bottomleft', metric:false, maxWidth:200}).addTo(mymap);
            ctlMouseposition = L.control.mousePosition().addTo(mymap);
            
            //ctlMeasure = L.control.polylineMeasure().addTo(mymap);
            
            // ************* Layer Initialization *****************

         
            /*
            var satMutant = L.gridLayer.googleMutant({
                maxZoom: 16,
                type:'satellite'
            });

            var terrainMutant = L.gridLayer.googleMutant({
                maxZoom: 16,
                type:'terrain'
            });
            */
         
            
            
               roadMutant = L.gridLayer.googleMutant({
                maxZoom: 16,
                type:'roadmap'
            }); //.addTo(mymap);
            mymap.addLayer(roadMutant);
            
              lyrImagery = L.tileLayer.provider('Esri.WorldImagery');
            
               hybridMutant = L.gridLayer.googleMutant({
                maxZoom: 20,
                type:'hybrid'
            });
        
            //lyrOSM = L.tileLayer.provider('OpenStreetMap.Mapnik');
            //lyrTopo = L.tileLayer.provider('OpenTopoMap');
          
            mymap.addLayer(hybridMutant);
            
            lyrCounty = L.geoJSON.ajax('data/County_Boundary.geojson', {style:{color:'black', fillOpacity:0}}); //.addTo(mymap);
            lyrCities = L.geoJSON.ajax('data/SCC_City_Boundaries.geojson', {style:{color:'gray', fillOpacity:0}}).addTo(mymap);
            //lyrLU = L.geoJSON.ajax('data/SCC_LU.geojson', {style:{color:'black', fillColor:'gray'}}).addTo(mymap);
            lyrWatersheds = L.geoJSON.ajax('data/SCC_Watersheds.geojson', {style:{color:'deepskyblue'}}); //.addTo(mymap);
            lyrCreeks = L.geoJSON.ajax('data/SCC_Creeks.geojson', {style:{color:'steelblue'}}); //.addTo(mymap);
            lyrOldInd = L.geoJSON.ajax('data/SCC_Old_Ind.geojson', {style:{color:'maroon', opacity:0.6, fillColor:'maroon', fillOpacity:0.2}}); //.addTo(mymap);
            //lyrLID = L.geoJSON.ajax('data/scc_lid2.geojson', {style:styleLID, onEachFeature:processLID, filter:filterLID}).addTo(mymap);

            lyrLID = L.geoJSON.ajax("layers/all_lid.php", {style: styleLID, onEachFeature:processLID, filter:filterLID}).addTo(mymap); 
            
            lyrLID.on('data:loaded', function() {
                GSIProjectNames.sort(function(a,b) {return a-b});
                $("#txtFindProject").autocomplete({
                    source:GSIProjectNames
                });
                lyrLID.bringToFront();
            });
            
            
            // *************** Setup Layer Control ******************


        var legend = L.control({position: 'topright'});
        legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML +=
       '<b> Project Type: </b><br>'+ 
         /*'<img src="legend/purp-line.png">&nbsp;Green Street<br>' +
        '<img src="legend/green-line.png">&nbsp;Parcel-based<br>' +
        '<img src="legend/orange-line.png">&nbsp;Regional Facility<br>'*/
        
                    '<svg height="100" width="180">' +
                        '<rect x="6" y="10" width="25" height="20" style="stroke-width: 3; stroke: limegreen;  fill: limegreen; fill-opacity:0.5;"/>' +
                        '<text x="40" y="25" style="font-family: sans-serif; font-size: 12px;">Parcel-based</text>' +
                        '<rect x="6" y="40" width="25" height="20" style="stroke-width: 3; stroke: blue; fill: blue; fill-opacity:0.5;"/>' +
                        '<text x="40" y="55" style="font-family: sans-serif; font-size: 12px;">Green Street</text>' +
                        '<rect x="6" y="70" width="25" height="20" style="stroke-width: 3; stroke: yellow; fill: yellow; fill-opacity:0.5;"/>' +
                        '<text x="40" y="85" style="font-family: sans-serif; font-size: 12px;">Regional Project</text>' +
                    '</svg>' 
        
        
        
        ;
        return div;
            
            
            
            
            
         
    
            
            
            
        };

legend.addTo(mymap); 









            objBasemaps = {
                "Roadmap": roadMutant,
                "Aerial": lyrImagery,
                "Hybrid": hybridMutant
            };
            objOverlays = {
                "GSI Projects":lyrLID,
                "County Boundary":lyrCounty,
                "City Boundaries":lyrCities,
                "Watersheds":lyrWatersheds,
                "Creeks":lyrCreeks,
                "Old Industrial":lyrOldInd    
            };
            
        
            ctlLayers = L.control.layers(objBasemaps, objOverlays, {collapsed : false}).addTo(mymap);

     /*       ctlLegend = new L.Control.Legend({
                position:'topright',
                controlButton:{title:"Legend"}
            }).addTo(mymap);
            
            $(".legend-container").append($("#legend"));
           $(".legend-toggle").append($("<i class='legend-toggle-icon material-icons' style='color:black'>menu</i>")); */

            
            // *********** Location Events *************
            
            mymap.on('locationfound', function(e) {
                console.log(e);
                if (mrkCurrentLocation) {
                    mrkCurrentLocation.remove();
                }
                mrkCurrentLocation = L.circle(e.latlng, {radius:e.accuracy/2}).addTo(mymap);
                mymap.setView(e.latlng, 14);
            });
            
            mymap.on('locationerror', function(e) {
                console.log(e);
                alert("Location was not found");
            });   
        });
        
        // *********** LID Property functions ************
        
        function styleLID(json) {
            var att = json.properties;
            switch (att.projtype) {
                case 'Parcel-based':
                    return {color:'limegreen'};
                    break;
                case 'Green Street':
                    return {color:'blue'};
                    break;
                case 'Regional Facility':
                    return {color:'yellow'};
                    break;    
                default:
                    return {color:'darkgoldenrod'}
                    break;
            }
        }
       
        function processLID(json, lyr) {
            var att = json.properties;
            lyr.bindTooltip("<h3>Project Name: "+att.projname+"</h3>");
            GSIProjectNames.push(att.projname);
            lyr.bindPopup("<h2>" + att.projname + "</h2><table class='table table-hover table-sm' style='font-size:12px'><tr><td><strong>Permittee: </strong></td><td>"+ att.permittee + "</td></tr><tr><td><strong>Status: </strong></td><td>"  + att.status + "</td></tr><tr><td><strong>Type: </strong></td><td>" + att.projtype + "</td></tr><tr><td><strong>C.3 Regulation: </strong></td><td>" + att.regulated + "</td></tr><tr><td><strong>Fiscal Year of Completion:&nbsp; </strong></td><td>" + att.fy + "</td></tr><tr><td><strong>Total Acres: </strong></td><td>" + Math.round(att.tot_acres *100)/100 + "</td></tr>  </table><br><h3>" + att.url + "</h3>");
        }
        

        
        function filterLID(json) {
            var arPermitteeFilter = [];
            var arRegulatedFilter = [];
            var arStatusFilter = [];
            var arPubPrivFilter = [];
            var arTrmnt_catFilter = [];
            var arProjTypeFilter = [];
            var arFYs = ["FY0203", "FY0304", "FY0405", "FY0506", "FY0607", "FY0708", "FY0809", "FY0910", "FY1011", "FY1112", "FY1213", "FY1314",  "FY1415", "FY1516", "FY1617", "FY1718", "FY1819", "FY1920", "FY2021", "FY2122", "FY2223"];
            var includeProject = 1;
            
            $("input[name=fltPermittee]").each(function() {
                if (this.checked) {
                    arPermitteeFilter.push(this.value);
                }
            });
            $("input[name=fltRegulated]").each(function() {
                if (this.checked) {
                    arRegulatedFilter.push(this.value);
                }
            });
            $("input[name=fltStatus]").each(function() {
                if (this.checked) {
                    arStatusFilter.push(this.value);
                }
            });
            $("input[name=fltPubPriv]").each(function() {
                if (this.checked) {
                    arPubPrivFilter.push(this.value);
                }
            });
            $("input[name=fltTrmnt_cat]").each(function() {
                if (this.checked) {
                    arTrmnt_catFilter.push(this.value);
                }
            });
            $("input[name=fltProjType]").each(function() {
                if (this.checked) {
                    arProjTypeFilter.push(this.value);
                }
            });
            
            var att = json.properties;
            
            //filters for GSI
            switch (att.permittee) {
                case "Campbell":
                    if (arPermitteeFilter.indexOf("Campbell") < 0) {
                        includeProject = 0;
                    } 
                    break;
                case "Cupertino":
                    if (arPermitteeFilter.indexOf("Cupertino") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "Los Gatos":
                    if (arPermitteeFilter.indexOf("Los_Gatos") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "Los Altos":
                    if (arPermitteeFilter.indexOf("Los_Altos") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "Los Altos Hills":
                    if (arPermitteeFilter.indexOf("Los_Altos_Hills") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "Milpitas":
                    if (arPermitteeFilter.indexOf("Milpitas") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "Monte Sereno":
                    if (arPermitteeFilter.indexOf("Monte_Sereno") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "Mountain View":
                    if (arPermitteeFilter.indexOf("Mountain_View") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "Palo Alto":
                    if (arPermitteeFilter.indexOf("Palo_Alto") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "San Jose":
                    if (arPermitteeFilter.indexOf("San_Jose") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "Santa Clara":
                    if (arPermitteeFilter.indexOf("Santa_Clara") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "Santa Clara County Unincorporated":
                    if (arPermitteeFilter.indexOf("Santa_Clara_County") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "Saratoga":
                    if (arPermitteeFilter.indexOf("Saratoga") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "Sunnyvale":
                    if (arPermitteeFilter.indexOf("Sunnyvale") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "Other":
                    if (arPermitteeFilter.indexOf("Other") < 0) {
                        includeProject = 0;
                    }
                    break;    
                default:
                    break;
            }
            
            switch (att.regulated) {
                case "Yes":
                    if (arRegulatedFilter.indexOf("C3_Yes") < 0) {
                        includeProject = 0;
                    } 
                    break;
                case "No":
                    if (arRegulatedFilter.indexOf("C3_No") < 0) {
                        includeProject = 0;
                    }
                    break;
                default:
                    break;
            }                
            
            switch (att.status) {
                case "Constructed":
                    if (arStatusFilter.indexOf("Constructed") < 0) {
                        includeProject = 0;
                    } 
                    break;
                case "Under Construction":
                    if (arStatusFilter.indexOf("Under_Construction") < 0) {
                        includeProject = 0;
                    }
                    break;
                default:
                    break;
            }  
            
            switch (att.pub_priv) {
                case "Public":
                    if (arPubPrivFilter.indexOf("Public") < 0) {
                        includeProject = 0;
                    } 
                    break;
                case "Private":
                    if (arPubPrivFilter.indexOf("Private") < 0) {
                        includeProject = 0;
                    }
                    break;
                default:
                    break;
            }  
            switch (att.trmnt_cat) {
                case "LID":
                    if (arTrmnt_catFilter.indexOf("LID") < 0) {
                        includeProject = 0;
                    } 
                    break;
                case "Non-LID":
                    if (arTrmnt_catFilter.indexOf("NonLID") < 0) {
                        includeProject = 0;
                    } 
                    break;
                case "Both LID and Non-LID":
                    if (arTrmnt_catFilter.indexOf("Both") < 0) {
                        includeProject = 0;
                    } 
                    break;
                case "Unknown":
                    if (arTrmnt_catFilter.indexOf("Unk") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "No Treatment":
                    if (arTrmnt_catFilter.indexOf("None") < 0) {
                        includeProject = 0;
                    }
                    break;    
                default:
                    break;
            } 
            switch (att.projtype) {
                case "Parcel-based":
                    if (arProjTypeFilter.indexOf("Parcel_Based") < 0) {
                        includeProject = 0;
                    } 
                    break;
                case "Green Street":
                    if (arProjTypeFilter.indexOf("Green_Street") < 0) {
                        includeProject = 0;
                    }
                    break;
                case "Regional Facility":
                    if (arProjTypeFilter.indexOf("Regional") < 0) {
                        includeProject = 0;
                    }
                    break;    
                default:
                    break;
            }  
                            
            var FYStart = parseInt($("#startFY option:selected").text().substr(2, 2), 10);
            var FYEnd = parseInt($("#endFY option:selected").text().substr(2, 2), 10);
            var projectFY = parseInt(att.fy.substr(2,2), 10);
            if(projectFY<FYStart || projectFY>FYEnd) {
                includeProject = 0;
            }                    
            
            if(includeProject==1) {
                return true;
            } else {
                return false;
            }
        }
        
        $("#txtFindProject").on('keyup paste', function(){
            var val = $("#txtFindProject").val();
            testLayerAttribute(GSIProjectNames, val, "projname", "#divFindProject", "#divProjectError", "#btnFindProject");
        });
        
        $("#btnFindProject").click(function(){
            var val = $("#txtFindProject").val();
            var lyr = returnLayerByAttribute(lyrLID,'projname',val);
            if (lyr) {
                if (lyrSearch) {
                    lyrSearch.remove();
                }
                //lyrSearch = L.geoJSON(lyr.toGeoJSON(), {style:{color:'red', weight:10, opacity:0.5}}).addTo(mymap);
                mymap.fitBounds(lyr.getBounds().pad(1));
                //var att = lyr.feature.properties;
                //$("#divProjectData").html("<h4 class='text-center'>Project Name</h4><h5>Type: "+att.projname+"</h5><h5>Fiscal Year: "+att.fy+ "m </h5>");
                //$("#divProjectError").html("");
                
            } else {
                $("#divProjectError").html("**** Project ID not found ****");
            }
        });

        $("#btnPermitteeFilterAll").click(function() {
            $("input[name=fltPermittee]").prop('checked', true);
        });
        
        $("#btnPermitteeFilterNone").click(function() {
            $("input[name=fltPermittee]").prop('checked', false);
        });
        
        $("#btnFilter").click(function() {
            GSIProjectNames=[];
            lyrLID.refresh();
            
        });
        
        
        // ********** JQuery Event Handlers ***********
        
        $("#btnLocate").click(function(){
                mymap.locate();
        });
        
    //    $("#btnShowLegend").click(function(){
      //      $("#legend").toggle();
    //    });

        // ********** General Functions ***************
        
        function returnLayerByAttribute(lyr,att,val) {
            var arLayers = lyr.getLayers();
            for (i=0;i<arLayers.length-1;i++) {
                var ftrVal = arLayers[i].feature.properties[att];
                if (ftrVal==val) {
                    return arLayers[i];
                }
            }
            return false;
        }
        
        function testLayerAttribute(ar, val, att, fg, err, btn) {
            
            if (ar.indexOf(val)<0) {
                //$(fg).addClass("has-error");
                //$(err).html("**** "+att+" NOT FOUND ****");
                //$(btn).attr("disabled", true);
            } else {
                //$(fg).removeClass("has-error");
                //$(err).html("");
                $(btn).attr("disabled", false);
            }
        }
        
    </script>


  <a href="../home.php" class="btn btn-circle mr-3 d-flex justify-content-center align-items-center"  data-toggle="tooltip" data-placement="top" title="Return to main menu" >
        <i class="material-icons">keyboard_return</i> 
    </a>

</body>
</html>
