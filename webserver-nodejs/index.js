process.title = 'MyWebServer';

const args = process.argv;
const port = args[2] || 3000;
const app = require('./server');

app.listen(port, function() {
  console.log('Server started at port ' + port);
});
