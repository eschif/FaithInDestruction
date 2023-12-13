webgazer.setGazeListener(function(data, elapsedTime) {
	if (data == null) {
		return;
	}
	var xprediction = data.x; //these x coordinates are relative to the viewport
	var yprediction = data.y; //these y coordinates are relative to the viewport
	console.log(elapsedTime); //elapsed time is based on time since begin was called
	console.log('X: '+xprediction + ',' + 'Y: '+yprediction);
	document.getElementById('elli').style.left = (xprediction-450)+'px';
    document.getElementById('elli').style.top = (yprediction-500)+'px';
}).begin();