module.exports = {
    entry: "./js/view/completeView.js",
    output: {
        filename: "bundle.js"
    },
    devServer: {
        inline: true,
        port: 3330
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.less$/,
            exclude: /node_modules/,
            loader: "style!css!less"
        },
        ]
    }
};
