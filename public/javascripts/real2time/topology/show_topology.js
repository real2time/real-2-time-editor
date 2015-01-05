var topology_charts = {};
var storm_api = location.protocol + '//' + location.hostname + ':' + proxy.storm_server.ui.port + '/api/v1/';

function formatConfigData(data) {
    var result = [];
    for (var prop in data) {
        result.push([
               prop,
               data[prop]
        ]);
    }
    return result;
}

function showTiles(current, tile_class) {
    $('#spouts_content .dashboard-stat, #bolts_content .dashboard-stat').addClass("blue-hoki");

    $('.tile').addClass("hide");
    $('.tile.'+tile_class).removeClass("hide");

    $('.sparkline-chart').addClass("hide");
    $('.sparkline-chart.'+tile_class).removeClass("hide");

    $(current).parent().removeClass("blue-hoki");
}

function showContent(content) {
    $('#spouts, #bolts').addClass('blue-hoki');

    if(content.indexOf("bolts") > -1) {
        $('#spouts_content').addClass("hide");
        $('#bolts_content').removeClass("hide");
        $('#bolts').removeClass('blue-hoki');
    } else {
        $('#bolts_content').addClass("hide");
        $('#spouts_content').removeClass("hide");
        $('#spouts').removeClass('blue-hoki');
    }

    $('.tile').addClass("hide");
}

function showSection(section) {
    if(section.indexOf("stats") > -1) {
        $('#info_section').addClass("hide");
        $('#conf_section').addClass("hide");
        $('#stats_section').removeClass("hide");

        showContent("bolts");

    } else if(section.indexOf("conf") > -1) {
        $('#info_section').addClass("hide");
        $('#stats_section').addClass("hide");
        $('#conf_section').removeClass("hide");
    } else {
        $('#stats_section').addClass("hide");
        $('#conf_section').addClass("hide");
        $('#info_section').removeClass("hide");
    }
}

function ensureInt(n) {
    var isInt = /^\d+$/.test(n);
    if (!isInt) {
        alert("'" + n + "' is not integer.");
    }

    return isInt;
}

function confirmAction(id, name, action, wait, defaultWait) {
    var opts = {
        type:'POST',
        url: storm_api + 'topology/' + id + '/' + action
    };
    if (wait) {
        var waitSecs = prompt('Do you really want to ' + action + ' topology "' + name + '"? ' +
                              'If yes, please, specify wait time in seconds:',
                              defaultWait);

        if (waitSecs != null && waitSecs != "" && ensureInt(waitSecs)) {
            opts.url += '/' + waitSecs;
        } else {
            return false;
        }
    } else if (!confirm('Do you really want to ' + action + ' topology "' + name + '"?')) {
        return false;
    }

    $("input[type=button]").attr("disabled", "disabled");
    $.ajax(opts).always(function () {
        window.location.reload();
    }).fail(function () {
        alert("Error while communicating with Nimbus.");
    });

    return false;
}

function getTopologyData() {

    var main_url = storm_api + 'topology/summary';

    $.ajax({
        url: main_url,
        dataType: "jsonp",
        async:false,
        success: function(data){
            for (var i = 0; i< data['topologies'].length; i++) {
                var topo = data['topologies'][i];
                if (topo['name'] === topology['_id']) {
                    loadData(topo['encodedId']);
                }
            }
        }
    })

}

function loadData (encodedId) {

    var main_url = storm_api + 'topology/' + encodedId + '?sys=true';

    $.ajax({
        url: main_url,
        dataType: "jsonp",
        success: function(data){
            fillData(data);
            renderButtons(data);
        }
    });

};

function addTile(where, name, number, tile_class) {
    where.innerHTML += ' \
        <div class="tile bg-blue-chambray bg-blue-hoki ' + tile_class + ' hide"> \
            <div class="tile-body"> \
                <i class="fa fa-bar-chart-o"></i> \
            </div> \
            <div class="tile-object"> \
                <div class="name">' + name + '</div> \
                <div class="number">' + number + '</div> \
            </div> \
        </div>';
}

function addGraph(where, name, number, tile_class, id) {
    where.innerHTML += ' \
        <div class="tile bg-blue-chambray bg-blue-hoki ' + tile_class + ' hide"> \
            <div class="tile-body"> \
                <div class="number" id="' + id + '"></div> \
            </div> \
            <div class="tile-object"> \
                <div class="name">' + name + '</div> \
                <div class="number">' + number + '</div> \
            </div> \
        </div>';
}

function initMiniCharts(charts) {

    // IE8 Fix: function.bind polyfill
    if (Metronic.isIE8() && !Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                aArgs.concat(Array.prototype.slice.call(arguments)));
            };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }

    for (key in charts) {
        $("#"+key).sparkline(charts[key], {
            type: 'line',
            width: '145',
            height: '90',
            lineColor: '#fff',
            fillColor: '#333',
            spotColor: '#000',
            minSpotColor: '#000',
            maxSpotColor: '#000',
            highlightSpotColor: '#000',
            highlightLineColor: '#fff'
        });
    }

}

function fillData (topo_data) {

    $('#topo_name')[0].innerHTML = topo_data['name'];
    $('#topo_id')[0].innerHTML = topo_data['id'];
    $('#topo_status')[0].innerHTML = topo_data['status'];
    $('#topo_status').addClass((topo_data['status'] === "ACTIVE") ? "bg-green" : "bg-red");
    $('#topo_uptime')[0].innerHTML = " " + topo_data['uptime'];
    $('#topo_num_workers')[0].innerHTML = topo_data['workersTotal'];
    $('#topo_num_executors')[0].innerHTML = topo_data['executorsTotal'];
    $('#topo_num_tasks')[0].innerHTML = topo_data['tasksTotal'];

    /* Fill spouts/bolts widgets */
    var validKeys = [
            "errorLapsedSecs", "transferred", "acked", "executeLatency", "tasks",
            "executed", "processLatency", "capacity", "failed",
            "completeLatency"];

    var bolts = topo_data['bolts'];
    $('#stats_header #bolts .details .number')[0].innerHTML = bolts.length;

    var bolts_content = $('#bolts_content');
    var bolts_subcontent = $('#bolts_subcontent');

    bolts_content[0].innerHTML = "";
    bolts_subcontent[0].innerHTML = "";

    for (var i=0; i<bolts.length; i++) {
        var bolt = bolts[i];
        bolts_content[0].innerHTML += ' \
            <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12"> \
                <div class="dashboard-stat blue-chambray blue-hoki"> \
                    <div class="visual"> \
                        <i class="icon-drop"></i> \
                    </div> \
                    <div class="details"> \
                        <div class="number">' + bolt['executors'] + '</div> \
                        <div class="desc">' + bolt['boltId'] + '</div> \
                    </div> \
                    <a class="more" href="javascript:void(0);" onclick="showTiles(this, \'tile_' + bolt['encodedBoltId'] + '\');"> \
                        View more <i class="m-icon-swapright m-icon-white"></i> \
                    </a> \
                </div> \
            </div>';

        for (var key in bolt) {
            if (validKeys.indexOf(key) != -1) {
                addTile(bolts_subcontent[0], key, bolt[key], "tile_"+bolt['encodedBoltId']);
            }
        }

        var id = "sparkline_"+bolt['encodedBoltId']+"_"+"emitted";
        addGraph(bolts_subcontent[0], "emitted", bolt["emitted"], "tile_"+bolt['encodedBoltId'], id);

        if (topology_charts[id] === undefined) {
            topology_charts[id] = [ bolt["emitted"] ];
        }
        else {
            topology_charts[id].push( bolt["emitted"] );
            if (topology_charts[id].length > 10) {
                topology_charts[id].pop(1);
            }
        }
    }


    var spouts = topo_data['spouts'];
    $('#stats_header #spouts .details .number')[0].innerHTML = spouts.length;

    var spouts_content = $('#spouts_content');
    var spouts_subcontent = $('#spouts_subcontent');

    spouts_content[0].innerHTML = "";
    spouts_subcontent[0].innerHTML = "";

    for (var i=0; i<spouts.length; i++) {
        var spout = spouts[i];
        spouts_content[0].innerHTML += ' \
            <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12"> \
                <div class="dashboard-stat blue-chambray blue-hoki"> \
                    <div class="visual"> \
                        <i class="icon-energy"></i> \
                    </div> \
                    <div class="details"> \
                        <div class="number">' + spout['executors'] + '</div> \
                        <div class="desc">' + spout['spoutId'] + '</div> \
                    </div> \
                    <a class="more" href="javascript:void(0);" onclick="showTiles(this, \'tile_' + spout['encodedSpoutId'] + '\');"> \
                        View more <i class="m-icon-swapright m-icon-white"></i> \
                    </a> \
                </div> \
            </div>';

        for (var key in spout) {
            if (validKeys.indexOf(key) != -1) {
                addTile(spouts_subcontent[0], key, spout[key], "tile_"+spout['encodedSpoutId']);
            }
        }
    }

    $('#topo_configuration').dataTable({
        destroy: true,
        "data": formatConfigData(topo_data["configuration"])
    });

    initMiniCharts(topology_charts);

    setTimeout(getTopologyData, 30000);
};

function renderButtons (topo_data) {

    var activateButton = $('#activate_topology');
    activateButton.on("click", null, null, function() {confirmAction(topo_data['encodedId'], topo_data['name'], 'activate', false, 0)} );

    var deactivateButton = $('#deactivate_topology');
    deactivateButton.on("click", null, null, function() {confirmAction(topo_data['encodedId'], topo_data['name'], 'deactivate', false, 0)} );

    var rebalanceButton = $('#rebalance_topology');
    rebalanceButton.on("click", null, null, function() {confirmAction(topo_data['encodedId'], topo_data['name'], 'rebalance', true, topo_data['msgTimeout'])} );

    var killButton = $('#kill_topology');
    killButton.on("click", null, null, function() {confirmAction(topo_data['encodedId'], topo_data['name'], 'kill', true, 30)} );
};

var TopologyShow = function () {

    return {

        //main function to initiate the module
        init: function () {

            var editButton = $('#edit_topology');
            editButton.on("click", null, null, function() { window.open("/editor?autoload="+topology['_id']) } );

            if (!jQuery().dataTable) {
                return;
            }

            getTopologyData();

            showSection('info');
        }

    };

}();
