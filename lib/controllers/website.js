exports.expressRoutes = function(app) {

    app.get('/', function(req, res){
        res.redirect(req.current_user ? '/editor' : '/sessions/signin');
    });

    // Editor
    app.get('/editor', app.require_login, function(req, res){

        app.db.collection('topologies', function(error, topology_collection) {
            if(error) { throw error; }

            topology_collection.find( {user_id: req.current_user._id }, function(error, cursor) {
                    if(error) { throw error; }
                    cursor.toArray(function(error, topologies) {
                        if(error) { throw error; }
                            res.render('website/editor', {
                                layout: false,
                                locals: {
                                    definitions: require(app.root + '/lib/simpleflow').definitions,
                                    current_user: req.current_user,
                                    total_topologies: topologies.length
                                }
                            });
                    });
                });
        });

    });

    // Dashboard
    app.get('/dashboard', app.require_login, function(req, res){

        app.db.collection('topologies', function(error, topology_collection) {
            if(error) { throw error; }

            topology_collection.find( {user_id: req.current_user._id }, function(error, cursor) {
                    if(error) { throw error; }
                    cursor.toArray(function(error, topologies) {
                        if(error) { throw error; }
                        res.render('website/dashboard', {
                            layout: false,
                            locals: {
                                user: req.current_user,
                                topologies: topologies,
                            }
                        });
                    });
                });
        });
    });

};
