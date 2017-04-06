var http = require('http');
// api klic, ktery je potreba pro pripojeni k Mongo databazi na mlab.com
var apiKey = '9I-wGKTgFqP8A5IJ6zP_jKl0Phgz5B9r';


var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Funguje!');
})
var request = require('request');

app.get('/get_threads', function (req, res) {
  var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/threads?s={"last_update":-1}&apiKey='+apiKey;
  request.get(
    url_mongoDB,
    function (error, response, body) {

      if (!error && response.statusCode == 200) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        // res.setHeader('Keep-Alive', 'timeout=5, max=100');
        // res.setHeader('Connection', 'Keep-Alive');
        // res.setHeader('Pragma', 'no-cache');
        // res.setHeader('Transfer-Encoding', 'chunked');
        res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Credentials', 'true');
        // res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0');
        // console.log(body)
        res.end(body);
      }
    }
  );
})

var request = require('request');
app.get('/get_one_thread', function (req, res) {
  console.log('===============')
  console.log(req.param('id'));
  console.log('===============')
  var iddddddddddddddddddddddd = 5;
  var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/threads?apiKey='+apiKey;
  request.get(
    url_mongoDB,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
        body = JSON.parse(body)
        console.log(body[0].text)
        for (let i = 0; i < body.length; i++) {
          if (req.param('id') == body[i].id) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(body[i]));
            return;
          }
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end('{}');
      }
    }
  );
})

app.get('/get_users', function (req, res) {
  var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/users?apiKey='+apiKey;
  request.get(
    url_mongoDB,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(body);
      }
    }
  );
})

var bodyParser = require("body-parser"); // Body parser for fetch posted data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data

app.post('/get_one_user',(req, res) =>  {
  console.log('----------------------')
  console.log(req.body);
  console.log(JSON.parse(req.body.data).user);
  console.log(JSON.parse(req.body.data).passw);
  user = JSON.parse(req.body.data).user;
  passw = JSON.parse(req.body.data).passw;
  console.log('----------------------')

  let query = "q={\"user\": \"" + user + "\", \"password\": \"" + passw + "\"}"
  var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/users?'+query+'&apiKey='+apiKey;
  console.log(url_mongoDB);
  request.get(
    url_mongoDB,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(JSON.parse(body)[0]))
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(JSON.parse(body)[0]));
      }
    }
  );
})

app.get('/get_userByID',function (req, res) {
  let query = "q={\"id\": \""+req.param('id')+"\"}"
  var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/users?'+query+'&apiKey='+apiKey;
  console.log(url_mongoDB);
  request.get(
    url_mongoDB,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(JSON.parse(body)[0]))
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(body);
      }
    }
  );
})

app.post('/add_user', function (req, res) {
  // {  "user": "josef",
  //   "password": "123456" }
  //TODO vyrobit pseudoAuto ID stejne jako u threadu

  let query = "f={\"id\": 1}"
  var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/users?'+query+'&apiKey='+apiKey;
  console.log(url_mongoDB);
  request.get(
    url_mongoDB,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var jsonBody = JSON.parse(body);
        var maximalID = 0;
        for (var i in jsonBody) {
          if (Number(jsonBody[i].id) > maximalID) maximalID = Number(jsonBody[i].id);
        }
        maximalID = maximalID + 1
        console.log("------- maximalID = "+maximalID+"--------");
        console.log("------- user from req = "+JSON.parse(req.body.data).user+"--------");

        user = JSON.parse(req.body.data).user;
        password = JSON.parse(req.body.data).password;
        let query = "q={\"user\": \"" + user + "\", \"password\": \"" + password + "\"}&c=true"
        var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/users?'+query+'&apiKey='+apiKey;
        console.log(url_mongoDB);
        request.get(
          url_mongoDB,
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log('======== '+body+' ========')
              if (body > 0){
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.end(JSON.stringify({error: "user already exist"}));
              }else{
                // var request2= require('request');
                url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/users?apiKey='+apiKey;
                console.log(url_mongoDB)
                var newUser = { json: { id: maximalID, user: user, password: password }};
                console.log(newUser)
                request.post(
                  url_mongoDB, newUser,
                  function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.setHeader('Access-Control-Allow-Origin', '*');
                      res.end(JSON.stringify(body));
                    }
                  }
                );

              }
            }
          }
        );

      }
    }
  );


})

app.post('/add_thread', function (req, res) {

  id_author = JSON.parse(req.body.data).id_author;
  last_update = JSON.parse(req.body.data).last_update;
  title = JSON.parse(req.body.data).title;
  text = JSON.parse(req.body.data).text;

  let query = "f={\"id\": 1}"
  var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/threads?'+query+'&apiKey='+apiKey;
  console.log(url_mongoDB);
  request.get(
    url_mongoDB,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var jsonBody = JSON.parse(body);
        var maximalID = 0;
        for (var i in jsonBody){
          if (Number(jsonBody[i].id) > maximalID) maximalID = Number(jsonBody[i].id);
        }
        maximalID = maximalID + 1

        // samotne pridani do databaze pomoci JSON objektu pres POST, jiz s pridanym ID
        url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/threads?apiKey='+apiKey;
        var newThread = { json: {
          id: maximalID.toString(),
          id_author: id_author,
          last_update: last_update,
          title: title,
          text: text} };
        console.log(newThread);
        request.post(
          url_mongoDB, newThread,
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(JSON.stringify(body));
            }
          }
        );

      }
    }
  );
})

app.get('/delete_thread', function (req, res) {

  let _idd = "";

  var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/threads?apiKey='+apiKey;
  request.get(
    url_mongoDB,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
        body = JSON.parse(body)
        console.log(body[0].text)
        for (let i = 0; i < body.length; i++) {
          if (req.param('id') == body[i].id) {
            _idd = body[i]._id.$oid
            console.log("============== "+_idd+" ==============")

            var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/threads/'+_idd+'?apiKey='+apiKey;
            var deleteThread = {json:"[]"};
            request.delete(
              url_mongoDB,
              function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  console.log(body)
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.end(body);
                }
              }
            );

          }
        }

      }
    }
  );
})

  app.post('/update_thread', function (req, res) {
    id = JSON.parse(req.body.data).id;
    last_update = JSON.parse(req.body.data).last_update;
    text = JSON.parse(req.body.data).text;

    let _idd = "";

    var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/threads?apiKey='+apiKey;
    request.get(
      url_mongoDB,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // console.log(body)
          body = JSON.parse(body)
          // console.log(body[0].text)
          for (let i = 0; i < body.length; i++) {
            if (id == body[i].id) {
              _idd = body[i]._id.$oid
              console.log("============== "+_idd+" ==============")


              url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/threads/' + _idd + '?apiKey=' + apiKey;
              var newThread = { json: { $set:{
                last_update: last_update,
                text: text} }};

              request.put(
                url_mongoDB, newThread,
                function (error2, response2, body2) {
                  if (!error2 && response2.statusCode == 200) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.end(JSON.stringify(body2));
                  }
                }
              );
            }
          }
        }
      }
    );
  })



// server.listen(3001, "127.0.0.2");
// var server = app.listen(3001,  "127.0.0.2", function () {

// var server = app.listen(process.env.PORT, "0.0.0.0", function () {
//   var host = server.address().address
//   var port = server.address().port
//
//   console.log("Example app listening at http://%s:%s", host, port)
// })



app.listen(process.env.PORT);

