const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' })

module.exports = {
    
    entry: path.resolve(__dirname, './src/index.js'), 

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                    loader: 'image-webpack-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.parsed),
          }),
    ],

    devServer: {
        static: path.resolve(__dirname, './dist')
    },
};