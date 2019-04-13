const url = require('url');
var http = require('http');
const routes = {};
require('glob').glob('dist/api/**/*.js', undefined, function(er, files) {
  files.forEach(function(file) {
    name = file.replace('dist', '').replace('/index.js', '');
    if (name === '') {
      name = '/';
    }
    console.log('name', name, 'file:', file);
    routes[name] = require(`./` + file);
  });

  console.info(`Found ${Object.keys(routes).length} lambdas!\n\n`);
});

const app = async (req, res) => {
  const { pathname } = url.parse(req.url);
  const key = Object.keys(routes).find(key => pathname === key);

  if (!key) {
    res.writeHead(404);
    res.end();

    return;
  }

  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    await routes[key](req, res);
  } catch (err) {
    console.error(err);
  }
};

http.createServer(app).listen(4000);
