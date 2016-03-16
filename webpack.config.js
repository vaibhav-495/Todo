module.exports = {
    entry: "./start.js",
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
            }
        ]
    }
};
