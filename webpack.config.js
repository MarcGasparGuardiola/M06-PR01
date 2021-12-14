const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: './src/js/login/login.js',
        user: './src/js/User.js',
        polyfill: 'babel-polyfill',
        teams: './src/js/teams.js',
        loadplayer: './src/js/loadPlayer.js',
        myteam: './src/js/myTeam/myTeam.js',
        helper: './src/js/helpers/helper.js',
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
            chunks: ['polyfill', 'index'],
        }),
        new HtmlWebpackPlugin({
            filename: 'teams.html',
            template: './src/teams.html',
            chunks: ['polyfill', 'loadplayer', 'teams'],
        }),
        new HtmlWebpackPlugin({
            filename: 'loadplayer.html',
            template: './src/loadplayer.html',
            chunks: ['polyfill', 'loadplayer'],
        }),
        new HtmlWebpackPlugin({
            filename: 'myteam.html',
            template: 'src/myteam.html',
            chunks: ['polyfill', 'myteam'],
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
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, // instead of style-loader
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use:
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/',
                    },
                },
            },
            {
                test: /\.html$/i,
                use: ['html-loader'],
            },
        ],
    },
};