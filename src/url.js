$.ajax({
	type: 'get',
	url: ''
}).done(function (a,b,c) {
	console.log(a,b,c)
}).fail(function (a,b,c) {
	console.log(a.getResponseHeader());
})

