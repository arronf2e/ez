module.exports = function(useSourceMap) {
	/** 模块数组 */
	var list = [];

	list.toString = function toString() {
		return this.map(function(item) {
			var content = cssWithMappingToString(item, useSourceMap);

			if (item[2]) {
				return '@media '.concat(item[2], ' {').concat(content, '}');
			}

			return content;
		}).join('');
	};

	list.i = function(modules, mediaQuery) {
		if (typeof modules === 'string') {
			// eslint-disable-next-line no-param-reassign
			modules = [[null, modules, '']];
		}

		for (var i = 0; i < modules.length; i++) {
			var item = [].concat(modules[i]);

			if (mediaQuery) {
				if (!item[2]) {
					item[2] = mediaQuery;
				} else {
					item[2] = ''.concat(mediaQuery, ' and ').concat(item[2]);
				}
			}

			list.push(item);
		}
	};

	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

	var cssMapping = item[3];

	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function(source) {
			return '/*# sourceURL='.concat(cssMapping.sourceRoot).concat(source, ' */');
		});
		return [content]
			.concat(sourceURLs)
			.concat([sourceMapping])
			.join('\n');
	}

	return [content].join('\n');
} // Adapted from convert-source-map (MIT)

function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(base64);
	return '/*# '.concat(data, ' */');
}
