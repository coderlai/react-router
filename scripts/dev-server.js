const express = require('express');
const webpack = require('webpack');
const bodyParser = require("body-parser")
const path = require("path")
const webpackDevMiddleware = require('webpack-dev-middleware');
var base = require("../config")
const config = require('../webpack.config.js');
var opn = require("opn")



const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// default port where dev server listens for incoming traffic
var port = process.env.PORT || base.dev.port

// automatically open browser, if not set will be false
var autoOpenBrowser = !!base.dev.autoOpenBrowser



// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
const compiler = webpack(config);
var devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    quiet: false
})
app.use(devMiddleware);

var staticPath = path.posix.join(base.dev.assetsPublicPath, base.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))


var uri = 'http://localhost:' + port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
        // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})

// Serve the files on port 3000.
app.listen(port, function() {
    console.log('Example app listening on port %d\n', port);
});