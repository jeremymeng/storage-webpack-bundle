const path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, './src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, './node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /[\\/]node_modules[\\/](?!(@azure|@opentelemetry)[\\/]).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env',
              {
                targets: "> 0.25%, last 2 versions, not dead",
                modules: "cjs"
              }]
            ],
            plugins: [
              ['@babel/plugin-transform-runtime']
            ],
            sourceMaps: true
          }
        }
      }
    ]
  }
};
