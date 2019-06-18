const path = require('path');
const webpack = require('webpack');
const HtmlWepackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV === 'production';

let plugins = [];

plugins.push(new HtmlWepackPlugin({
	inject: true,
	hash: true,
	minify: {
		html5: true,
		collapseWhitespace: true,
		removeComments: true
	},
	filename: 'index.html',
	template: `${__dirname}/src/index.html`,
	favicon: './src/favicon.ico'

}));

if(isProduction) {
	plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
	plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }));
	plugins.push(new webpack.DefinePlugin({
		'process.env':{
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'MAPS_API_KEY': JSON.stringify(process.env.MAPS_API_KEY)
		}
	}));
} else {
	plugins.push(new Dotenv());
}

module.exports = {
	mode: isProduction ? 'production' : 'development',
	entry: './src/index.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'build')
	},
	devtool: isProduction ? false : 'source-map',
	devServer: {
		port: 3000,
		stats: 'errors-only',
		historyApiFallback: true,
		open: !process.argv.includes('--no')
	},
	module: {
		rules: [
			/* JS/JSX FILES - LOGIC AND COMPONENTS */
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},

			/* CSS/SCSS FILES - STYLE */
			{
				test: /\.(css|scss|sass)$/,
				use: [
					isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: !isProduction
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			},

			/* ASSETS FILES */
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				}
			},

			/* NETLIFY REDIRECT */
			{
				test: [/_redirects/],
				use: {
					loader: 'file-loader',
					options: {
						name: '[name]',
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins
};