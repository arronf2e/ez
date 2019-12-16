import webpack from 'webpack';
import Ez from '@ez-fe/core';
export async function build() {
	const ez = new Ez({ NODE_ENV: 'production' });

	await ez.init();

	const { webpackConfig } = ez;

	webpack(webpackConfig, (err, stats) => {
		console.log('build done');

		if (err || stats.hasErrors()) {
			console.log(err);
			console.log(stats);
		}
	});
}
