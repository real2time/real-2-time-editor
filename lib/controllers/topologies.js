exports.expressRoutes = function(app) {

    var ObjectID = require('mongodb').ObjectID,
        simpleflow = require(app.root + '/lib/simpleflow'),
        ejs = require('ejs');

    // store the topology collection into req.topology_collection
    function get_topology_collection(req, res, next) {
        app.db.collection('topologies', function(error, topology_collection) {
            if(error) { throw error; }
            else {
                req.topology_collection = topology_collection;
                next();
            }
        });
    }

    // store the topology document into req.topology
    function get_topology( req, res, next) {
        req.topology_collection.findOne({
                    user_id: req.current_user._id,
                    _id: ObjectID.createFromHexString(req.param('id'))
            }, function(error, topology) {
                if(error) { throw error; }
                req.topology = topology;
                next();
            });
    }


    // Display and search topologies
    app.get('/topologies', app.require_login, get_topology_collection, function(req, res){

        // TODO: pagination

        // Search
        var query = {user_id: req.current_user._id };
        if( req.param("q") ) {
            query.name = new RegExp( req.param("q") , "i");
        }

        req.topology_collection.find({
            $query: query,
            $orderby: {updated_at: -1} }, {}, 0, 20, function(error, cursor) {
                 if(error) { throw error; }
              cursor.toArray(function(error, topologies) {
                    if(error) { throw error; }
                res.render('website/topologies', {
                        layout: 'layout_old',
                        locals: {
                            title: "Topologies",
                            action: "topologies",
                            topologies: topologies,
                            search: req.param("q")
                        }
                    });
              });
        });

    });


    // list topologies for user in JSON
    app.get('/topologies.json', app.require_login, get_topology_collection, function(req, res){
        req.topology_collection.find( {user_id: req.current_user._id }, function(error, cursor) {
            if(error) { throw error; }
            cursor.toArray(function(error, topologies) {
                if(error) { throw error; }
                res.send( JSON.stringify(topologies) , { 'Content-Type': 'application/json' });
          });
        });
    });

    //Show topology page in json format
    app.get('/topologies/:id.json', app.require_login, get_topology_collection, get_topology, function(req, res){
        res.send( JSON.stringify(req.topology) , { 'Content-Type': 'application/json'});
    });


    // Show topology page: stats page
    app.get('/topologies/:id', app.require_login, get_topology_collection, get_topology, function(req, res){

        app.db.collection('topologies', function(error, topology_collection) {
            if(error) { throw error; }

            topology_collection.find( {user_id: req.current_user._id }, function(error, cursor) {
                    if(error) { throw error; }
                    cursor.toArray(function(error, topologies) {
                        if(error) { throw error; }
                        res.render('topologies/show', {
                            locals: {
                                title: "Topology "+req.topology.name,
                                action: "topologies",
                                topology: req.topology,
                                params: {}, // TODO: be able to pass default parameters to fill the form ?
                                total_topologies: topologies.length,
                                proxy: app.config.proxy
                            }
                        });
                    });
                });
        });

    });

    // Modify a topology (other parameters, from a html form)
    // Use POST instead of PUT so we can use HTML forms
    app.post('/topologies/:id', app.require_login, get_topology_collection, get_topology, function(req, res){

        req.topology.updated_at = new Date();

        console.log("REQ.TOPOLOGY._ID" , req.topology._id);

        req.topology_collection.update({_id: req.topology._id}, req.topology, function(error, docs){
            if(error) { throw error; }

            req.flash('notice', "saved !");
            res.redirect('/topologies/'+req.topology._id.toHexString() );

        });
    });


    // Add a topology
    app.post('/topologies', app.require_login, get_topology_collection, function(req, res){

        var topology = req.body.topology;

        topology.user_id = req.current_user._id;

        var d = new Date();
        topology.created_at = d;
        topology.updated_at = d;

        topology.author = {
            name: req.current_user.name,
            email: req.current_user.email
        };

        req.topology_collection.insert(topology, function(error, docs) {
            if(error) { throw error; }
            res.send( JSON.stringify(docs[0]) , { 'Content-Type': 'application/json' }, 201);
        });

    });

    // Modify a topology (json)
    app.put('/topologies/:id.json', app.require_login, get_topology_collection,get_topology, function(req, res){

        var topology = req.body.topology;

        for(var k in topology) {
            req.topology[k] = topology[k];
        }

        req.topology.updated_at = new Date();

        req.topology_collection.update({_id: new ObjectID(req.topology._id.toHexString())}, req.topology, function(error, docs){
            if(error) { throw error; }

            res.send( JSON.stringify(docs) , { 'Content-Type': 'application/json' });
        });

    });


    // Delete a topology
    app.del('/topologies/:id.json',app.require_login, get_topology_collection,get_topology, function(req, res){
        req.topology_collection.remove({_id: new ObjectID(req.topology._id.toHexString())}, function(error){
            if(error) { throw error; }
            res.send(200);
        });
    });

    /*************************************
     * EXECUTION
     *************************************/

    function sendToPythonServer (topology, res_client) {

        var http = require('http');

        var topologyString = JSON.stringify(topology);

        var headers = {
            'Content-Type': 'application/json',
            'Content-Length': topologyString.length
        };

        var options = {
            host: app.config.r2t_storm.host,
            port: app.config.r2t_storm.port,
            path: "/",
            method: 'POST',
            headers: headers
        };

        var req = http.request(options, function(res) {
//            console.log('STATUS: ' + res.statusCode);
//            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf-8');

            res_client.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            });

            res.on('data', function (chunk) {
//                console.log('DATA: ' + chunk);
                while ((index = chunk.indexOf('{')) > -1) {
                    var index2 = chunk.indexOf('}') + 1;
                    var data = chunk.substring(index, index2);

                    chunk = chunk.substring(index2);

                    var json_data = JSON.parse( data )

                    res_client.write( "data: " + data +"\n\n" )

                    if (json_data.compiled !== undefined) {
                        topology.compiled = json_data.compiled;
                        req.topology_collection.update({_id: new ObjectID(topology._id.toHexString())}, topology, function(error, docs){
                            if(error) { throw error; }
                        });
                    } else if (json_data.upload !== undefined) {
                        topology.upload = json_data.upload;
                        req.topology_collection.update({_id: new ObjectID(topology._id.toHexString())}, topology, function(error, docs){
                            if(error) { throw error; }
                        });
                        res_client.end();
                    }
                }
            });
        });

        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });

        req.write(topologyString);

        req.end();
    }

    // Run the topology !
    function run_topology(topology, req, res) {
        topology.compiled = false;
        topology.upload = false;

        req.topology_collection.update({_id: new ObjectID(req.topology._id.toHexString())}, req.topology, function(error, docs){
            if(error) { throw error; }
        });

        sendToPythonServer(topology, res);
    }

    app.get('/topologies/:id/run', app.require_login, get_topology_collection, get_topology, function(req, res){
       run_topology(req.topology, req, res);
    });
    app.post('/topologies/:id/run', app.require_login, get_topology_collection, get_topology, function(req, res){
        run_topology(req.topology, req, res);
    });

};
