var err = new Promise((resolve, reject) => {
	setTimeout(() => {
    	resolve();
    	resolve(new Error(errrr));
    }, 1000);
	// throw new Error('errrrrr');
});

err.then((res) => {
	console.log('then',res);
}).catch((err) => {
	console.log('catch',err)
});
