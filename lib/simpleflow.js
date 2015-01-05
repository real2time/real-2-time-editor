var fs = require('fs');

/**
* Core modules
*
* Module functions takes two arguments, the params object, and the callback.
* They MUST return an object !
*
*/
var CoreModules = {

    input: function(p, cb) {
        var key = p["input"]["name"],
        val = p.hasOwnProperty(key) ? p[key] : p["input"]["value"];
        cb({"out": val });
    },

    output: function(params, cb) {
        cb({"out": params["in"] });
    }

};

var definitions = [];

// Dynamically load modules from the lib/modules directory
fs.readdirSync(__dirname+'/modules').forEach(function(file) {
    // test if JS file
    if(file.substr(-3) == ".js") {
        var moduleName = file.substr(0, file.length-3);
        var module = require(__dirname+'/modules/'+file);
        definitions.push(module.definition);
        CoreModules[moduleName] = module.run;
    }
});

// Load NPM r2t-* packages
var npm = require('npm');
npm.load({}, function (err) {
    if (err) throw err;

    console.log("NPM list of Real2Time modules: ");
    npm.commands.ls([], true, function (err, packages) {
        if (err) throw err;
        var package_names = Object.keys(packages.dependencies);
        for(var k in package_names) {
            var pkg = package_names[k];
            var name = pkg.split("-");
            if(name.length < 2 || name[0] !== "r2t") continue;

            console.log("Loading module: "+pkg);
            var m = require(pkg);
            if( typeof m.run == "function" && typeof m.definition == "object") {
                definitions.push(m.definition);
                CoreModules[name[1]] = m.run;
            }
            else {
                console.log("Unable to find Real2Time module definition in package: "+pkg);
            }
        }
    });
});

exports.definitions = definitions;
