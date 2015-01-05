exports.expressRoutes = function(app) {

    // store the user collection into req.user_collection
    function get_user_collection(req, res, next) {
        app.db.collection('users', function(error, user_collection) {
            if(error) { throw error; }
            else {
                req.user_collection = user_collection;
                next();
            }
        });
    }

};