import webpack from 'webpack';
import { Arguments } from 'yargs';
import Ez from '@ez-fe/core';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';

export async function build(args: Arguments) {
	const { target } = args;
	const ez = new Ez({ NODE_ENV: 'production', BUILD_ENV: target as BUILD_ENV });

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
