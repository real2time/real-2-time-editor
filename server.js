/**
 * server.js
 *  - set up an Express.js server
 *  - load config file (depends on the environment)
 *  - connect to mongoDB
 *  - configure various middleware
 *  - load controllers & helpers
 */
var express = require('express'),
    fs = require('fs'),
    Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    connect = require('connect'),
    mongoStore = require('connect-mongodb'),
    httpProxy = require('http-proxy');

// express server
var app = express.createServer();
app.root = __dirname;

// Load config file
app.config = require(app.root + '/config/' + app.set('env') + '.js');

// Load environment config
app.config.database.host    = process.env.R2T_EDITOR_DATABASE_HOST || app.config.database.host
app.config.database.port    = parseInt(process.env.R2T_EDITOR_DATABASE_PORT) || app.config.database.port
app.config.database.db      = process.env.R2T_EDITOR_DATABASE_DB   || app.config.database.db
app.config.database.options.auto_reconnect = JSON.parse(process.env.R2T_EDITOR_DATABASE_OPTIONS_AUTO_RECONNECT || app.config.database.options.auto_reconnect)

app.config.server.port = parseInt(process.env.R2T_EDITOR_LISTEN_PORT) || app.config.server.port
app.config.server.address = process.env.R2T_EDITOR_LISTEN_ADDRESS || app.config.server.address

app.config.sessions.key     = process.env.R2T_EDITOR_SESSIONS_KEY      || app.config.sessions.key
app.config.sessions.secret  = process.env.R2T_EDITOR_SESSIONS_SECRET   || app.config.sessions.secret

app.config.r2t_storm.port = parseInt(process.env.R2T_STORM_LISTEN_PORT) || app.config.r2t_storm.port
app.config.r2t_storm.host = process.env.R2T_STORM_LISTEN_HOST || app.config.r2t_storm.host

app.config.storm_server.ui.port = parseInt(process.env.R2T_EDITOR_STORM_SERVER_UI_PORT) || app.config.storm_server.ui.port
app.config.storm_server.ui.host = process.env.R2T_EDITOR_STORM_SERVER_UI_HOST || app.config.storm_server.ui.host
app.config.proxy.storm_server.ui.port = process.env.R2T_EDITOR_PROXY_STORM_SERVER_UI_PORT || app.config.proxy.storm_server.ui.port

app.config.users.creation.public = JSON.parse(process.env.R2T_EDITOR_USERS_CREATION_PUBLIC || app.config.users.creation.public)

// Database Connect to mongo
app.db = new Db(
        app.config.database.db,
        new Server(app.config.database.host, app.config.database.port, app.config.database.options)
);
console.log("Connecting to MongoDB...");

app.db.open(function(err) {

    // Don't start without MongoDB running
    if(err) {
        console.log(err);
        return;
    }

    // Middleware setup
    app.use(express.logger());          // Enable request logging
    app.use(express.bodyParser());      // parses urlencoded request bodies which populates req.body
    app.use(express.methodOverride());  // sets a hidden input of _method to an arbitrary HTTP method
    app.use(express.cookieParser());    // Required by session

    // Use connect-mongodb SessionStore
    app.use(
        connect.session({
            cookie: {maxAge: 60000 * 20}, // 20 minutes
            secret: app.config.sessions.secret,
            store: new mongoStore({db: app.db})
        })
    );

    // User model
    User = require(app.root + '/lib/user').init(app.db);

    // Create default user

    User.create({
        name: "real2time",
        email: "info@real2time.com",
        password: "real2time",
        password_confirmation: "real2time",
        created_at: new Date()
    }, function(errors, user) {
        if(errors.length > 0) {
            console.log("error creating default user: " + errors)
        }
        else {
            console.log("default user created: real2time:real2time")
        }
    }, function(err) {
        console.log("error creating default user: " + err.message)
    });

    // Authentication => populate req.current_user
    app.use(
        (function() {
            return function(req, res, next) {
                User.authenticate(req, res, function(current_user) {
                    req.current_user = current_user;
                    next();
                }, function() {
                    next();
                });
            };
        })()
    );

    app.dynamicHelpers({
        // req.flash to html helper
        messages: function(req, res){
            return function(){
                var buf = [],
                    messages = req.flash(),
                    types = Object.keys(messages),
                    len = types.length;

                if (!len) {
                   return '';
                }

                buf.push('<div id="messages">');
                for (var i=0; i<len; ++i) {
                    var type = types[i],
                        msgs = messages[type], j;
                    buf.push('  <ul class="' + type + '">');
                    for (j=0, len=msgs.length; j<len; ++j) {
                        var msg = msgs[j];
                        buf.push('    <li>' + msg + '</li>');
                    }
                    buf.push('  </ul>');
                }
                buf.push('</div>');
                return buf.join('\n');
            };
        },
        message_errors: function(req, res){
            return function(error_type){
                var buf = [],
                    messages = req.flash(),
                    types = Object.keys(messages),
                    len = types.length;

                if (!len) {
                    return '';
                }

                for (var i=0; i<len; ++i) {
                    var type = types[i],
                        msgs = messages[type], j;
                    if (type === error_type) {
                        for (j=0, len=msgs.length; j<len; ++j) {
                            var msg = msgs[i];
                            buf.push(
'<div class="alert alert-danger login-error"> \
    <button class="close" data-close="alert"></button> \
    <span> \
    ' + msg + ' \
    </span> \
</div>');
                        }
                    } else {
                        req.flash(type, [msgs]);
                    }
                }
                return buf.join('\n');
            }
        },
        current_user: function(req, res){
            return req.current_user;
        }
    });

    app.use(app.router);
    app.use(express["static"](app.root + '/public'));

    app.set('views', app.root + '/lib/views');
    app.set('view engine', 'ejs');

    app.error(function(err, req, res, next){
        if (err.message == "Unauthorized") {
            res.render('401', { layout: 'layout_4xx_5xx', status: 401, locals: { title: '401 Unauthorized', action: 'error', error: err }});
        }
        else {
            console.log(err)
            res.render('500', { layout: 'layout_4xx_5xx', status: 500, locals: { title: '500 Internal error', action: 'error', error: err }});
        }
    });


    // Middleware for authentication checking
    app.require_login = function(req, res, next) {
        (!!req.current_user) ? next() : next(new Error('Unauthorized'));
    };

    // Require all helpers & controllers
    var loadDirs = ['helpers', 'controllers'];
    loadDirs.forEach(function(dir) {
        fs.readdirSync(app.root + '/lib/'+dir+'/').forEach(function(file) {
            // test if JS file
            if(file.substr(-3) == ".js") {
                require(app.root + '/lib/'+dir+'/'+file).expressRoutes(app);
            }
        });
    });

    // Catch all other routes
    app.use(function(req,res) {
        res.render('404', { layout: 'layout_4xx_5xx', status: 404, locals: { title: '404 Page not found', action: 'error' }});
    } );

    // Proxy to storm ui
    httpProxy.createServer({target:'http://' + app.config.storm_server.ui.host + ':' + app.config.storm_server.ui.port}).listen(app.config.proxy.storm_server.ui.port);
    console.log("Storm UI Proxy on: http://" + app.config.server.address+":"+app.config.proxy.storm_server.ui.port);

    // start the server
    app.listen(app.config.server.port, app.config.server.address);

    console.log("App started in '"+app.set('env')+"' environment !\n" +
                    "Listening on http://"+app.config.server.address+":"+app.config.server.port);

    // Intercept exceptions after init so that the server doesn't crash at each uncatched exception
    process.on('uncaughtException', function (err) {
        console.log('Caught exception: ' + err);
        console.log(err.stack);
    });

});
