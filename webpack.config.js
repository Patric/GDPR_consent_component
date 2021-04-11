const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");



module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 8080,
        headers: { "Access-Control-Allow-Origin": "*" },
      },
    entry: { index: path.resolve(__dirname, "src", "index.js")},
    output: {path:  path.resolve(__dirname, "build")},
    module: { 
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader:  "html-loader",
                        options: {
                            minimize: true,

                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:  ["babel-loader"]
            }
        ]
    },
    optimization:{
        splitChunks: { chunks: "all"},
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        }),
    ],
  
  
};