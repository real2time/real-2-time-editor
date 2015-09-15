var fs = require('fs');

var definitions = [];

// Dynamically load modules from the lib/modules directory
fs.readdirSync(__dirname+'/modules').forEach(function(file) {
    // test if JS file
    if(file.substr(-3) == ".js") {
        var moduleName = file.substr(0, file.length-3);
        var module = require(__dirname+'/modules/'+file);
        definitions.push(module.definition);
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
            if( typeof m.definition == "object") {
                definitions.push(m.definition);
            } else if ( typeof m.definitions == "object") {
                m.definitions.forEach(function(definition) {
                    if( typeof m.definition == "object") {
                        definitions.push(m.definition);
                    }
                });
            } else {
                console.log("Unable to find Real2Time module definition in package: "+pkg);
            }
        }
    });
});

exports.definitions = definitions;
