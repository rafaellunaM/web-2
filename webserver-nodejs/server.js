var http = require('http'),
    config = require('./config'),
    fileHandler = require('./filehandler'),
    parse = require('url').parse,
    types = config.types,
    rootFolder = config.rootFolder,
    defaultIndex = config.defaultIndex;

function onRequest(req, res) {
    var filename = parse(req.url).pathname,
        fullPath,
        extension;

    if (filename === '/') {
        filename = defaultIndex;
    }

    fullPath = rootFolder + filename;
    extension = filename.substr(filename.lastIndexOf('.') + 1);

    fileHandler(fullPath, function(data) {
        res.writeHead(200, {
            'Content-Type': types[extension] || 'text/plain',
            'Content-Length': data.length
        });
        res.end(data);

    }, function(err) {
        res.writeHead(404);
        res.end();
    });
}

var server = http.createServer(onRequest);

module.exports = server;
