'use strict';

var path = require('path');
var baseDir = process.cwd();

module.exports = {
    devtool: '#inline-source-map',

    context: path.join(baseDir, 'public/js'),
    output: {
        path: path.join(baseDir, '.build/js/'),
        filename: '[name].bundle.js'
    },
    entry: {
        sudoku: ['babel-polyfill', './sudoku'],
        name: './name'
    },

    resolve: {
        alias: {
            angular: 'angular/angular.min'
        },

        root: path.join(baseDir, 'public', 'js'),
        modulesDirectories: ['node_modules'],
        fallback: [ path.join(baseDir, 'node_modules') ]
    },

    resolveLoader: {
        root: path.join(baseDir, 'node_modules')
    },

    module: {
        loaders: [
            { test: /[\/]angular\.js&/, loader: 'exports?angular' },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    }
};
