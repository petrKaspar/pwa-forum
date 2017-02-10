var http = require('http');
// api klic, ktery je potreba pro pripojeni k Mongo databazi na mlab.com
var apiKey = '9I-wGKTgFqP8A5IJ6zP_jKl0Phgz5B9r';
var server = http.createServer(function(req, res) {
    console.log('///////////////////////////')
    console.log(req.method)
    console.log(req.headers)
    if (req.method == 'POST' || req.method == 'OPTIONS') {
        var request = require('request');
        var body = '';
        var data = {};
        req.on('data', function (data) {
            body += data;
            data = JSON.parse(body);
            console.log('*****************************************************')
            console.log(body);
            // for (let i = 0; i < data.length; i++){
            //     console.log(data[i].id)
            //     // console.log('*******')
            // }

            if (data.action == 'get_threads'){
                /*
                 { "action": "get_threads" }
                 */
                var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/threads?apiKey='+apiKey;
                request.get(
                    url_mongoDB,
                    function (error, response, body) {
                        console.log(body);
                        console.log('**************************')
                        console.log(JSON.parse(body)[0]);
                        console.log('**************************')
                        console.log(JSON.parse(body)[0].text);
                        console.log('**************************');
                        // console.log(body);
                        if (!error && response.statusCode == 200) {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(body);
                        }
                    }
                );
            } else if (data.action == 'get_one_thread'){
                /*
                 { "action": "get_one_thread",
                    "id": "7" }
                 */
                var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/threads?apiKey='+apiKey;
                request.get(
                    url_mongoDB,
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(body)
                            body = JSON.parse(body)
                            console.log(body[0].text)
                            for (let i = 0; i < body.length; i++){
                                if (data.id == body[i].id){
                                    res.writeHead(200, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify(body[i]));
                                }
                            }
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end('{}');
                        }
                    }
                );
            } else if (data.action == 'get_users'){
                /*  { "action": "get_users"}     */
                var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/users?apiKey='+apiKey;
                request.get(
                    url_mongoDB,
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(body)
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(body);
                        }
                    }
                );
            } else if (data.action == 'get_one_user'){
                /*
                 {  "action": "get_one_user",
                    "user": "b",
                    "password": "b"}
                 */
                // q={"id": "7"}&
                let query = "q={\"user\": \""+data.user+"\", \"password\": \""+data.password+"\"}"
                var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/users?'+query+'&apiKey='+apiKey;
                console.log(url_mongoDB);
                request.get(
                    url_mongoDB,
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(JSON.stringify(JSON.parse(body)[0]))
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(JSON.parse(body)[0]));
                        }
                    }
                );

            }  else if (data.action == 'get_userByID'){
              /*
               {  "action": "get_userByID",
               "id": "1"}
               */
              // q={"id": "7"}&
              let query = "q={\"id\": \""+data.id+"\"}"
              var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/users?'+query+'&apiKey='+apiKey;
              console.log(url_mongoDB);
              request.get(
                url_mongoDB,
                function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                    console.log(JSON.stringify(JSON.parse(body)[0]))
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(JSON.parse(body)[0]));
                  }
                }
              );

            }else if (data.action == 'add_user'){
                /*
                 {  "action": "add_user",
                    "user": "josef",
                    "password": "123456" }
                */
                //TODO vyrobit pseudoAuto ID stejne jako u threadu
                let query = "q={\"user\": \""+data.user+"\"}&c=true"
                var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/users?'+query+'&apiKey='+apiKey;
                console.log(url_mongoDB);
                request.get(
                    url_mongoDB,
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log('======== '+body+' ========')
                            if (body > 0){
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({error: "user already exist"}));
                            }else{
                                // var request2= require('request');
                                url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/users?apiKey='+apiKey;
                                console.log(url_mongoDB)
                                var newUser = { json: { user: data.user, password: data.password} };
                                console.log(newUser)
                                request.post(
                                    url_mongoDB, newUser,
                                    function (error, response, body) {
                                        if (!error && response.statusCode == 200) {
                                            res.writeHead(200, { 'Content-Type': 'application/json' });
                                            res.end(JSON.stringify(body));
                                        }
                                    }
                                );


                            }
                        }
                    }
                );
            }else if (data.action == 'add_thread'){
                // TODO predelat pro thread; vracet statuskod podle toho, zda uz zaznam v databazi existuje,
                // nebo se vytvori novy
               /*
                 {  "action": "add_thread",
                    "id_author": "josef",
                    "last_update": "josef",
                    "title": "josef",
                    "text": "josef" }
                */
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
                                id_author: data.id_author,
                                last_update: data.last_update,
                                title: data.title,
                                text: data.text} };
                            console.log(newThread);
                            request.post(
                                url_mongoDB, newThread,
                                function (error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        res.writeHead(200, { 'Content-Type': 'application/json' });
                                        res.end(JSON.stringify(body));
                                    }
                                }
                            );



                        }
                    }
                );



            } else if (data.action == 'delete_thread'){
                /*
                 {  "action": "delete_thread",
                     "id": "3" }
                 */
                let query = "q={\"id\": \""+data.id+"\"}"
                var url_mongoDB = 'https://api.mlab.com/api/1/databases/backend_pwa/collections/threads?'+query+'&apiKey='+apiKey;
                var deleteThread = {json:"[]"};
                console.log(url_mongoDB)
                console.log(deleteThread)
                request.put(
                    url_mongoDB, deleteThread,
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(body)
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(body);
                        }
                    }
                );
            } else if (data.action == 'update_thread'){

                // res.writeHead(200, { 'Content-Type': 'application/json' });
                // res.end('{}');
            } else {
                // res.writeHead(200, { 'Content-Type': 'application/json' });
                // res.end('{}');
            }
            console.log('-----------------------------------------------')

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', function () {
            // var post = qs.parse(body);
            // // use post['blah'], etc.
        })
    } else if (req.method == 'GET') {
        // console.log('==============******======*******======*****================');
        // console.log(req.headers);
        // console.log((req.url));
        /*var rrr = JSON.stringify({
         "data": [{
         "_id": {
         "$oid": "589cd22ac2ef162b33d7a296"
         },
         "id": "1",
         "id_author": "2",
         "last_update": "1482965255",
         "title": "Lorem ipsum dolor ",
         "text": "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
         }, {
         "_id": {
         "$oid": "589cd248bd966f2cc1c43eaf"
         },
         "id": "2",
         "id_author": "1",
         "last_update": "1482965259",
         "title": "Lorem ipsum gaude",
         "text": "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
         }, {
         "_id": {
         "$oid": "589cd264c2ef162b33d7a2d7"
         },
         "id": "3",
         "id_author": "1",
         "last_update": "1482965321",
         "title": "Consectetur adipiscing ",
         "text": "amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
         }, {
         "_id": {
         "$oid": "589cd28bbd966f2cc1c43f43"
         },
         "id": "4",
         "id_author": "1",
         "last_update": "1482965339",
         "title": " Laboris nisi ut",
         "text": "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat"
         }, {
         "_id": {
         "$oid": "589cd29dbd966f2cc1c43f58"
         },
         "id": "5",
         "id_author": "3",
         "last_update": "1482965439",
         "title": " Duis aute irure ",
         "text": "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat"
         }, {
         "_id": {
         "$oid": "589cd2c6c2ef162b33d7a528"
         },
         "id": "6",
         "id_author": "1",
         "last_update": "1482965439",
         "title": "Excepteur sint occaecat ",
         "text": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
         }, {
         "_id": {
         "$oid": "589cd2e3bd966f2cc1c4442a"
         },
         "id": "7",
         "id_author": "2",
         "last_update": "1482965439",
         "title": "Sed ut perspiciatis unde omnis iste",
         "text": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto"
         }, {
         "_id": {
         "$oid": "589cd306bd966f2cc1c44444"
         },
         "id": "8",
         "id_author": "3",
         "last_update": "1482965589",
         "title": "Nemo enim ipsam voluptatem quia",
         "text": "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt"
         }, {
         "_id": {
         "$oid": "589cd323bd966f2cc1c4445f"
         },
         "id": "9",
         "id_author": "4",
         "last_update": "1482965799",
         "title": "Neque porro quisquam est",
         "text": "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem"
         }, {
         "_id": {
         "$oid": "589cd34cc2ef162b33d7a5a6"
         },
         "id": "10",
         "id_author": "3",
         "last_update": "1482966099",
         "title": "At vero eos et accusamus et iusto odio dignissimos ",
         "text": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga"
         }, {
         "_id": {
         "$oid": "589cd367c2ef162b33d7a5c2"
         },
         "id": "11",
         "id_author": "1",
         "last_update": "1482966199",
         "title": "Et harum quidem rerum ",
         "text": "Et harum quidem rerum facilis est et expedita distinctio, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga"
         }, {
         "_id": {
         "$oid": "589cd3c6c2ef162b33d7a63a"
         },
         "id": "14",
         "id_author": "1",
         "last_update": "1482966389",
         "title": "officia deserunt mollitia animi",
         "text": "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
         }, {
         "_id": {
         "$oid": "589cd3ccc2ef162b33d7a640"
         },
         "id": "15",
         "id_author": "1",
         "last_update": "1482966389",
         "title": "officia deserunt mollitia animi",
         "text": "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
         }, {
         "_id": {
         "$oid": "589cd3e4bd966f2cc1c4452c"
         },
         "id": "16",
         "id_author": "2",
         "last_update": "1482966399",
         "title": "similique sunt in deserunt mollitia animi",
         "text": "similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
         }, {
         "_id": {
         "$oid": "589cd384bd966f2cc1c444b1"
         },
         "id": "12",
         "id_author": "5",
         "last_update": "1482966199",
         "title": "Itaque earum rerum hic tenetur",
         "text": "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
         }, {
         "_id": {
         "$oid": "589cd3aabd966f2cc1c444e4"
         },
         "id": "13",
         "id_author": "6",
         "last_update": "1482966339",
         "title": "Blanditiis praesentium",
         "text": "dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident"
         }]
         });
         */
        var qqq = {data: [{id: "11"}]}

        var request = require('request');
        var body = '';
        var data = {};

    //     var url_mongoDB = 'http://private-bd1632-forum13.apiary-mock.com/getThreads';
    //     request.get(
    //         url_mongoDB,
    //         function (error, response, body) {
    //             console.log(body);
    //             console.log('**************************')
    //             console.log(JSON.parse(body)[0]);
    //             console.log('**************************')
    //             console.log(JSON.parse(body).data[0].text);
    //             console.log('**************************');
    //             // console.log(body);
    //             if (!error && response.statusCode == 200) {
    //                 console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
    //                 //res.writeHead(200, {'Content-Type': 'application/json'});
    //
    //
    //             }
    //         }
    //     );



    // res.setHeader('Connection', 'Transfer-Encoding');
    // res.setHeader('Content-Type', 'application/json; charset=utf-8');
    // res.setHeader('Transfer-Encoding', 'chunked');
    // res.setHeader('accept', '*/*');
    //
    // // res.write('hello');
    // res.write(JSON.stringify(qqq));
    //
    // // setTimeout(function() {
    // //     res.write(' world!');
    // //     res.end();
    //
    // res.end(JSON.stringify(qqq)) ;
    // req.on('end', function () {
    //     // var post = qs.parse(body);
    //     // // use post['blah'], etc.
    // })


    // }, 2000);
    // res.end(JSON.stringify(qqq)) ;


        // res.writeHead(200, { 'Content-Type': 'application/json' });
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end('Funguje!') ;
    }
    // }

});
server.listen(process.env.PORT);
// server.listen(3001, "127.0.0.2");
