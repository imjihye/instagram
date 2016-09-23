'use strict';

var config = {
	entry: './src/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	module: {
		loaders:[
			{test: /\.css$/, loader: 'style!css'},
			{test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: {
				cacheDirectory: true,
				presets: ['es2015', 'react']
			}}
		]
	}
}

module.exports = config;