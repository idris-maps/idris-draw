var init = require('./lib/init')

window.onload = function() {
	setMapHeight()
	init('map')
}

window.onresize = function() {
	setMapHeight()
}

function setMapHeight() {
	var mapH = window.innerHeight - document.getElementById('header').offsetHeight - 10
	document.getElementById('map').style.height = mapH + 'px'	
}

