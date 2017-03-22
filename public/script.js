!function e(t,n,o){function r(i,l){if(!n[i]){if(!t[i]){var d="function"==typeof require&&require
if(!l&&d)return d(i,!0)
if(a)return a(i,!0)
var u=new Error("Cannot find module '"+i+"'")
throw u.code="MODULE_NOT_FOUND",u}var p=n[i]={exports:{}}
t[i][0].call(p.exports,function(e){var n=t[i][1][e]
return r(n?n:e)},p,p.exports,e,t,n,o)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<o.length;i++)r(o[i])
return r}({1:[function(e,t,n){function o(e,t){if("rectangle"===e){var n="Polygon",o=[]
t._latlngs[0].forEach(function(e){o.push([e.lng,e.lat])}),o.push([t._latlngs[0][0].lng,t._latlngs[0][0].lat])
var r=[o]}else if("polygon"===e){var n="Polygon",o=[]
t._latlngs[0].forEach(function(e){o.push([e.lng,e.lat])}),o.push([t._latlngs[0][0].lng,t._latlngs[0][0].lat])
var r=[o]}else if("polyline"===e){var n="LineString",r=[]
t._latlngs.forEach(function(e){r.push([e.lng,e.lat])})}else if("marker"===e)var n="Point",r=[t._latlng.lng,t._latlng.lat]
return{type:n,coordinates:r}}t.exports=function(){var e=this
e.id=0,e.propKeys=[],e.properties={},e.addGeom=function(t){e.id=e.id+1,e.properties[t.layer._leaflet_id]={id:e.id,layerType:t.layerType}},e.addProperty=function(t,n,o){isNaN(o)||(o=+o),e.properties[t][n]=o
var r=!1
e.propKeys.forEach(function(e){e===n&&(r=!0)}),r||e.propKeys.push(n)},e.getProperties=function(t){var n=[]
for(k in e.properties[t])n.push({key:k,value:e.properties[t][k]})
return n},e.toGeoJSON=function(t){var n=[]
for(k in t._layers){var r={type:"Feature",properties:e.properties[k],geometry:o(e.properties[k].layerType,t._layers[k])}
n.push(r)}return{type:"FeatureCollection",features:n}}}},{}],2:[function(e,t,n){var o="iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAYAAAC9pNwMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADtQAAA7UBCn5qWwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEnSURBVEiJ7ZUxSgNREEDfhBQBMQhWKVKJIKRQS9N5ghRewNoj2FjlACGQG6QWC/EGokjQwkLSh1ib3rFwId/N7s7ssrhFdmCK/Tv/vQ+fmY+q4kngBFAjL728BhVFLa7Ftbi0kGg4bP4QOQDGrA+3C/QN3juwCL5HqvqQWGlMqxvsaZWW90AjlW2IBbgrIJ0De5lsx4xuAx85pCugZ3KdD8QR8OUUX7iYOV6nAfBtSIdunrcwkl9nSG+JuqR0cSSfJkhfgZ1cnALiFvAcSD+Bbl6OAG+x1r5S1ceNhg9CRDrAC7APnKvqk1HfBybhWhM4jtW1syAAqroUkQFwaEkD5h9P07EpTT4DZkX3b9/rVJk46Y7PRKRVsuc0viD89uK/x/bdcWXiH2BFcZ2Yon4xAAAAAElFTkSuQmCC",r=e("./save")
t.exports=function(e){var t=L.Control.extend({options:{position:"topright"},onAdd:function(t){var n=L.DomUtil.create("div","leaflet-bar leaflet-control leaflet-control-custom")
return n.style.backgroundColor="white",n.style.width="30px",n.style.height="30px",n.style.padding="5px",n.innerHTML='<img id="download-btn" src="data:image/png;base64,'+o+'" style="width:100%"/>',n.onclick=function(){r.json("geo.json",e.toGeoJSON())},n}}),n=this
n.shown=!1,n.map=e.map,n.show=function(){n.shown||(n.map.addControl(new t),n.shown=!0)}}},{"./save":5}],3:[function(e,t,n){function o(){var e=document.getElementsByClassName("leaflet-draw-draw-circle")[0]
e.parentNode.removeChild(e)}var r=e("./Data"),a=e("./on-event"),i=e("./download-button"),l=L.tileLayer("http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",{maxZoom:18,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'})
t.exports=function(e){var t=this
t.data=new r,t.map=L.map(e).setView([25,0],2),t.dlBtn=new i(t),l.addTo(map),t.drawn=new L.FeatureGroup,map.addLayer(drawn)
var n=new L.Control.Draw({edit:{featureGroup:drawn}})
return map.addControl(n),o(),t.map.on("draw:created",function(e){a.onDrawCreated(e,t)}),t.drawn.on("click",function(e){a.onDrawnClick(e,t)}),t.toGeoJSON=function(){return t.data.toGeoJSON(t.drawn)},t}},{"./Data":1,"./download-button":2,"./on-event":4}],4:[function(e,t,n){n.onDrawCreated=function(e,t){var n=e.layer
if(t.drawn.addLayer(n),t.data.addGeom(e),t.dlBtn.show(),0!==t.data.propKeys.length){var o="<b>Add properties</b>"
t.data.propKeys.forEach(function(e){o=o+'<br/><input class="props-input" id="'+e+'" placeholder="key: '+e+'">'}),o+='<br/><button id="add-props">OK</button>',n.bindPopup(o).openPopup(),document.getElementById("add-props").onclick=function(){var e=document.getElementsByClassName("props-input")
for(i=0;i<e.length;i++)t.data.addProperty(n._leaflet_id,e[i].id,e[i].value)
n.closePopup()}}},n.onDrawnClick=function(e,t){var n=t.data.getProperties(e.layer._leaflet_id),o="<b>Properties</b>"
n.forEach(function(e){o=o+"<br/><b>"+e.key+"</b>: "+e.value}),o+='<br/><button id="add-property">Add property</button>',e.layer.bindPopup(o).openPopup(),document.getElementById("add-property").onclick=function(){var n='<b>Add property</b><input id="key" placeholder="key"><input id="value" placeholder="value"><br/><button id="add-property-form">OK</button>'
e.layer.bindPopup(n),document.getElementById("add-property-form").onclick=function(){document.getElementById("key").value&&document.getElementById("value").value&&t.data.addProperty(e.layer._leaflet_id,document.getElementById("key").value,document.getElementById("value").value),e.layer.closePopup()}}}},{}],5:[function(e,t,n){var o=o||function(e){"use strict"
if(!("undefined"==typeof e||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var t=e.document,n=function(){return e.URL||e.webkitURL||e},o=t.createElementNS("http://www.w3.org/1999/xhtml","a"),r="download"in o,a=function(e){var t=new MouseEvent("click")
e.dispatchEvent(t)},i=/constructor/i.test(e.HTMLElement)||e.safari,l=/CriOS\/[\d]+/.test(navigator.userAgent),d=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},u="application/octet-stream",p=4e4,c=function(e){var t=function(){"string"==typeof e?n().revokeObjectURL(e):e.remove()}
setTimeout(t,p)},s=function(e,t,n){t=[].concat(t)
for(var o=t.length;o--;){var r=e["on"+t[o]]
if("function"==typeof r)try{r.call(e,n||e)}catch(e){d(e)}}},f=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([String.fromCharCode(65279),e],{type:e.type}):e},y=function(t,d,p){p||(t=f(t))
var y,v=this,g=t.type,m=g===u,w=function(){s(v,"writestart progress write writeend".split(" "))},h=function(){if((l||m&&i)&&e.FileReader){var o=new FileReader
return o.onloadend=function(){var t=l?o.result:o.result.replace(/^data:[^;]*;/,"data:attachment/file;"),n=e.open(t,"_blank")
n||(e.location.href=t),t=void 0,v.readyState=v.DONE,w()},o.readAsDataURL(t),void(v.readyState=v.INIT)}if(y||(y=n().createObjectURL(t)),m)e.location.href=y
else{var r=e.open(y,"_blank")
r||(e.location.href=y)}v.readyState=v.DONE,w(),c(y)}
return v.readyState=v.INIT,r?(y=n().createObjectURL(t),void setTimeout(function(){o.href=y,o.download=d,a(o),w(),c(y),v.readyState=v.DONE})):void h()},v=y.prototype,g=function(e,t,n){return new y(e,t||e.name||"download",n)}
return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t,n){return t=t||e.name||"download",n||(e=f(e)),navigator.msSaveOrOpenBlob(e,t)}:(v.abort=function(){},v.readyState=v.INIT=0,v.WRITING=1,v.DONE=2,v.error=v.onwritestart=v.onprogress=v.onwrite=v.onabort=v.onerror=v.onwriteend=null,g)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content)
"undefined"!=typeof t&&t.exports?t.exports.saveAs=o:"undefined"!=typeof define&&null!==define&&null!==define.amd&&define("FileSaver.js",function(){return o}),n.json=function(e,t){var n=new Blob([JSON.stringify(t)],{type:"application/json;charset=utf-8"})
o(n,e)},n.text=function(e,t){var n=new Blob([t],{type:"text/plain;charset=utf-8"})
o(n,e)},n.svg=function(e,t){var n=new Blob([t],{type:"image/svg+xml;charset=utf-8"})
o(n,e)},n.blob=function(e,t){o(t,e)}},{}],6:[function(e,t,n){function o(){var e=window.innerHeight-document.getElementById("header").offsetHeight-10
document.getElementById("map").style.height=e+"px"}var r=e("./lib/init")
window.onload=function(){o(),r("map")},window.onresize=function(){o()}},{"./lib/init":3}]},{},[6])
