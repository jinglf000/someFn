function reloadPage (time) {
	var timer = null;
	timer = setInterval(function () {
		// window.location.reload();
		console.log(Date.now());
	}, time);
}

reloadPage(300 * 1000);