const remoteHost = "https://api.npmjs.org"
const headers = {
  "Bearer": "sometoken"
}

var restify = require('restify');
var fetch = require('isomorphic-fetch')

var server = restify.createServer({
  name: 'mock-api',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    return next()
  }
)

server.get('.*', function(req, res, next) {
  console.log(req.url)
  var response = fetch(`${remoteHost}${req.url}`,{
    headers: headers
  })
  .then((response) => {
    response.json().then((json) => {
      res.send(json)
      return next()
    })
  })
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
