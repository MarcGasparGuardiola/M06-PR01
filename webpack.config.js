const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: './src/js/login/login.js',
        user: './src/js/User.js',
        polyfill: 'babel-polyfill',
        loadplayer: './src/js/loadPlayer.js',
        myteam: './src/js/myTeam/myTeam.js',
    },
    output: {
        path: path.resolve(__dirname, 'build', 'target'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle_[chunkhash].js',
        sourceMapFilename: '[file].map',
    },
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            filename: 'loadplayer.html',
            template: './src/loadplayer.html',
            chunks: ['loadplayer'],
        }),
        new HtmlWebpackPlugin({
            filename: 'myteam.html',
            template: 'src/myteam.html',
            chunks: ['myteam'],
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // instead of style-loader
                    'css-loader',
                ],
            },
        ],
    },
};