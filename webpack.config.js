module.exports = {

    entry: './src/cli-app/index.js',
    output: {
        path: __dirname+ '/src/cli-public',
        filename: 'bundle.js'
    },
    module:{
        rules:[
            {
                use:"babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }

};  