const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
	context: path.join(__dirname, 'src'),
	entry: './js/app.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.[hash].js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
		}),
		new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{ from: 'images', to: 'images' },
				{ from: 'assets', to: '' },
			],
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		port: 9000,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},

			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: ['file-loader'],
			},
		],
	},
}
