/**
* Real2Time
*/
var real2time = {

    language: {
        languageName: "real2time",

        propertiesFields: [
            //{"type": "hidden", inputParams: {"name": "_id"} },
            {"type": "string", inputParams: {"name": "name", label: "Title", typeInvite: "Enter a title" } },
            {"type": "text", inputParams: {"name": "description", label: "Description", cols: 30} }
        ],

    },

    init: function() {
        try {
            this.editor = new real2time.TopologyEditor(this.language);

            YAHOO.util.Dom.setStyle('app', 'display','');
            YAHOO.util.Dom.setStyle('appLoading', 'display','none');

        }catch(ex){console.log(ex);}
    },

    run: function() {

        var that = this.editor;

        var d = that.getValue(false);
        var d1 = new $.Deferred();

        $.when(d).done(function(value) {

            if (that.isSaved()) {
                // Get the id
                var prev = that.pipesByName[value.name];

                if(!prev || !prev.id) {
                    bootbox.alert("Open a topology first.");
                    d1.resolve();
                }

                d1.resolve({url: "/topologies/" + prev.id});
                //window.open("/topologies/" + prev.id + "/run");

            } else {

                // TODO topology_user_id_temp
                if (value.name === "") {
                    value.name = "topology_temp";
                } else {
                    value.name += "_temp";
                }

                that.tempSavedTopology = {name: value.name, working: value.working, language: that.options.languageName };

                that.adapter.saveTopology(that.tempSavedTopology, {
                    success: function(o) {
                        that.saveModuleSuccessWithoutAlert(o);

                        // Get the id
                        var prev = that.pipesByName[value.name];

                        if(!prev || !prev.id) {
                            bootbox.alert("Open a topology first.");
                            d1.resolve();
                        }

                        d1.resolve({url: "/topologies/" + prev.id});
                        //window.open("/topologies/" + prev.id + "/run");

                    },
                    failure: that.saveModuleFailure,
                    scope: that
                });
            }

        });

        return d1.promise();
    },

};

YAHOO.util.Event.onDOMReady( real2time.init, real2time, true);

/**
* For the debugger so he knows the last selected container to display debug infos
*/
WireIt.Container.prototype.setFocus = function() {
    if( !YAHOO.util.Dom.hasClass(this.el, "WireIt-Container-focused") ) {
        real2time.lastSelectedContainerIndex = WireIt.indexOf( this, real2time.editor.layer.containers);
    }
    YAHOO.util.Dom.addClass(this.el, "WireIt-Container-focused");
};