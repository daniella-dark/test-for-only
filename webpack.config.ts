import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const config: webpack.Configuration = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        filename: '[name].[contenthash].js',
        path    : path.resolve(__dirname, 'dist'),
        clean   : true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new webpack.ProgressPlugin()
    ],
    module: {
        rules: [
            {
                test   : /\.tsx?$/,
                use    : 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [ "style-loader", "css-loader", "sass-loader" ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'inline-source-map',
};

export default config;