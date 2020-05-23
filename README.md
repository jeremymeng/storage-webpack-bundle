# Steps

## Prepare the test project

- `md ie11`
- `cd ie11`
- `npm init -y`
- add `src/index.js` with the following code

```javascript
// src/index.js
const { BlobServiceClient } = require("@azure/storage-blob");

const url = "<url with sas token>";
const client = new BlobServiceClient(url);

// Now do something interesting with BlobServiceClient

async function listing() {
    for await (const container of client.listContainers()) {
        console.log(container.name)
    }
}

client.getProperties().then(properties => {
    console.log(properties);

    listing().catch(error => {
        console.log(error)
    });
})
```

- add `index.js` with the following code

```html
<script src="https://cdn.polyfill.io/v2/polyfill.js?features=Symbol,Promise,String.prototype.startsWith,String.prototype.endsWith,String.prototype.repeat,String.prototype.includes,Array.prototype.includes,Object.assign,Object.keys|always,Symbol.iterator"></script>
<script src="./dist/main.js"></script>
```

- `npm i @azure/storage-blob`

- `npm i --save-dev webpack webpack-cli`

If you run `npx webpack-cli` now, the output `dist/main.js` would contain several occurrences of `class` keyword.

## Use Babel to transpile our output.

- `npm i --save-dev @babel/preset-env @babel/plugin-transform-runtime @babel/core babel-loader`

- add `webpack.config.js` with the following code. The most relevant pieces are the babel-loader part. The setting `targets: "> 0.25%, last 2 versions, not dead",` for `@babel/preset-env` ensure IE 11 is supported.

```javascript
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
```

- Now run webpack again, it should output code that is compatible with IE 11.
