const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
	ident: 'postcss',
	plugins: [
		postcssPresetEnv({
			browsers: ['Chrome >= 52', 'FireFox >= 44', 'Safari >= 7', 'last 2 Edge versions', 'IE 10'],
		}),
	],
};
