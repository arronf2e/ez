setTimeout(() => {
	process &&
		process.send &&
		process.send({
			type: 'starting',
			data: {
				name: ' Starting the development server...',
				step: 3,
			},
		});
}, 3000);

setTimeout(() => {
	process &&
		process.send &&
		process.send({
			type: 'starting',
			data: {
				name: ' Starting the development server...',
				step: 1,
			},
		});
}, 1000);

setTimeout(() => {
	process &&
		process.send &&
		process.send({
			type: 'starting',
			data: {
				name: ' Starting the development server...',
				step: 2,
			},
		});
}, 2000);

setTimeout(() => {
	process &&
		process.send &&
		process.send({
			type: 'success',
			data: {
				name: 'Server is running at 13138.',
			},
		});
}, 3000);
