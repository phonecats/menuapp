module.exports = {
	entry: './main.js',
	output: {
		filename: './bundle.js'
	},
	watch: true,
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}

			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: 'style-loader!css-loader'
			}
		]
	}
};
