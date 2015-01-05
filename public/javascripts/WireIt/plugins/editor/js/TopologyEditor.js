(function() {
    var util = YAHOO.util,lang = YAHOO.lang;
    var Event = util.Event, Dom = util.Dom, Connect = util.Connect,widget = YAHOO.widget;

/**
 * The TopologyEditor class provides a full page interface
 * @class TopologyEditor
 * @extends WireIt.BaseEditor
 * @constructor
 * @param {Object} options
 */
WireIt.TopologyEditor = function(options) {

    /**
     * Hash object to reference module definitions by their name
     * @property modulesByName
     * @type {Object}
     */
    this.modulesByName = {};
    this.pipesByName = {};
    this.topology_properties = {};
    WireIt.TopologyEditor.superclass.constructor.call(this, options);

    // LoadTopologies
    if( this.adapter.init && YAHOO.lang.isFunction(this.adapter.init) ) {
        this.adapter.init();
    }

    this.load(false);
};

lang.extend(WireIt.TopologyEditor, WireIt.BaseEditor, {

    /**
     * @method setOptions
     * @param {Object} options
     */
    setOptions: function(options) {

        WireIt.TopologyEditor.superclass.setOptions.call(this, options);

        // Load the modules from options
        this.modules = options.modules || [];

        for(var i = 0 ; i < this.modules.length ; i++) {
            var m = this.modules[i];
            this.modulesByName[m.name] = m;
        }

        this.adapter = options.adapter || WireIt.TopologyEditor.adapters.JsonRpc;

        this.options.languageName = options.languageName || 'anonymousLanguage';

        this.options.layerOptions = {};
        var layerOptions = options.layerOptions || {};

        this.options.layerOptions.parentEl = layerOptions.parentEl ? layerOptions.parentEl : Dom.get('editor_container');

        this.options.modulesAccordionViewParams = YAHOO.lang.merge({
            collapsible: true,
            expandable: true, // remove this parameter to open only one panel at a time
            width: 'auto',
            expandItem: 0,
            animationSpeed: '0.3',
            animate: true,
            effect: YAHOO.util.Easing.easeBothStrong
        },options.modulesAccordionViewParams || {});

        // Grouping options
        var temp = this;
        var baseConfigFunction = function(name)  {
            return (name == "Group") ? ({
                "xtype": "WireIt.GroupFormContainer",
                "title": "Group",
                "collapsible": true,
                "fields": [ ],
                "legend": "Inner group fields",
                "getBaseConfigFunction" : baseConfigFunction
            }) : temp.modulesByName[name].container;
        };

        this.options.layerOptions.grouper = {"baseConfigFunction": baseConfigFunction };

    },

    /**
     * Add the rendering of the layer
     */
    render: function() {

       WireIt.TopologyEditor.superclass.render.call(this);

        /**
         * @property layer
         * @type {WireIt.Layer}
         */
        this.layer = new WireIt.Layer(this.options.layerOptions);
        this.layer.eventChanged.subscribe(this.onLayerChanged, this, true);

        // Left Accordion
        this.renderModulesAccordion();

        // Render module list
        this.buildModulesList();
    },

    /**
     * render the modules accordion in the left panel
     */
    renderModulesAccordion: function() {

        $('ul.page-sidebar-menu').append(
            '<li id="module-category-spouts"> \
                <a href="javascript:;"> \
                    <i class="icon-drop"></i> \
                    <span class="title">Spouts</span> \
                </a> \
                <ul class="sub-menu"></ul> \
            </li>');

        $('ul.page-sidebar-menu').append(
            '<li id="module-category-bolts"> \
                <a href="javascript:;"> \
                    <i class="icon-energy"></i> \
                    <span class="title">Bolts</span> \
                </a> \
                <ul class="sub-menu"></ul> \
            </li>');

        $('ul.page-sidebar-menu').append(
            '<li id="module-category-utils"> \
                <a href="javascript:;"> \
                    <i class="icon-settings"></i> \
                    <span class="title">Utils</span> \
                </a> \
                <ul class="sub-menu"></ul> \
            </li>');

    },


    /**
     * Build the left menu on the left
     * @method buildModulesList
     */
    buildModulesList: function() {

        var modules = this.modules;
        for(var i = 0 ; i < modules.length ; i++) {
            this.addModuleToList(modules[i]);
        }

        // Make the layer a drag drop target
        if(!this.ddTarget) {
            this.ddTarget = new YAHOO.util.DDTarget(this.layer.el, "module");
            this.ddTarget._layer = this.layer;
        }
    },

    /**
     * Add a module definition to the left list
     */
    addModuleToList: function(module) {

        try {

            var item = WireIt.cn('li');
            item.appendChild( WireIt.cn('a', {href:"javascript:;"}, null, '<span class="module">'+module.name+'</span>') );

            var ddProxy = new WireIt.ModuleProxy(item, this);
            ddProxy._module = module;

            // Get the category element in the accordion or create a new one
            var category = module.category.toLowerCase() || "Main";
            var el = $("#module-category-"+category)[0];
            if( !el ) {
                $('ul.page-sidebar-menu').append(
                    '<li id="module-category-'+category+'"> \
                        <a href="javascript:;"> \
                            <i class="icon-home"></i> \
                            <span class="title">'+category+'</span> \
                        </a> \
                        <ul class="sub-menu"></ul> \
                    </li>');

                el = $("#module-category-"+category)[0];
            }

            var subcategory = module.subcategory;
            if (subcategory) {
                var el2 = $("#module-category-"+category+"-"+subcategory+" ul")[0];
                if( !el2 ) {

                    $('#module-category-'+category+" ul:first").append(
                        '<li id="module-category-'+category+'-'+subcategory+'"> \
                            <a href="javascript:;"> \
                                <i class="icon-arrow-right"></i> \
                                '+subcategory+' \
                            </a> \
                            <ul class="sub-menu"></ul> \
                        </li>'
                    );

                    el2 = $("#module-category-"+category+"-"+subcategory+" ul")[0];
                }

                el2.appendChild(item);

            } else {
                el = $("#module-category-"+category+" ul")[0];
                el.appendChild(item);
            }
        } catch(ex){ console.log(ex);}
    },


    getCurrentGrouper: function(editor) {
        return editor.currentGrouper;
    },

    /**
     * add a module at the given pos
     */
    addModule: function(module, pos) {
        try {
            var containerConfig = module.container;
                containerConfig.position = pos;
                containerConfig.title = module.name;
                containerConfig.storm_type = module.storm_type;
                containerConfig.requiredFields = module.requiredFields;
                containerConfig.emitedFields = module.emitedFields;
            var temp = this;
                containerConfig.getGrouper = function() { return temp.getCurrentGrouper(temp); };
            var container = this.layer.addContainer(containerConfig);

            // Adding the category CSS class name
            var category = module.category || "main";
            Dom.addClass(container.el, "TopologyEditor-module-category-"+category.replace(/ /g,'-'));

            // Adding the module CSS class name
            Dom.addClass(container.el, "TopologyEditor-module-"+module.name.replace(/ /g,'-'));

        } catch(ex) {
            bootbox.alert("Error Layer.addContainer: "+ ex.message);
            if(window.console && YAHOO.lang.isFunction(console.log)) {
                console.log(ex);
            }
        }
    },

    /**
     * save the current module
     */
    save: function() {

        var d = this.getValue();
        var that = this;

        $.when(d).done(function(value) {

            console.log(value);

            if (value.save_topology) {

                if((value.name === "") || (value.name === null)) {
                    bootbox.alert("Please choose a name");
                    return;
                }

                that.tempSavedTopology = {name: value.name, working: value.working, language: that.options.languageName };

                that.adapter.saveTopology(that.tempSavedTopology, {
                    success: that.saveModuleSuccess,
                    failure: that.saveModuleFailure,
                    scope: that
                });

            }
        });
    },

    /**
     * saveModule success callback
     * @method saveModuleSuccess
     */
    saveModuleSuccess: function(o) {

        this.markSaved();

        if (!$.isEmptyObject(o)) {
            this.pipesByName[o.name] = {id: o._id, name: o.name, working: o.config};
        }

        bootbox.alert("Topology saved!");
    },

    saveModuleSuccessWithoutAlert: function(o) {

        if (!$.isEmptyObject(o)) {
            this.pipesByName[o.name] = {id: o._id, name: o.name, working: o.config};
        }

    },

    /**
     * saveModule failure callback
     * @method saveModuleFailure
     */
    saveModuleFailure: function(errorStr) {
        bootbox.alert("Unable to save the topology : " + errorStr);
    },


    /**
     * @method onNew
     */
    onNew: function() {
        var that = this;

        var new_func = function() {
            that.preventLayerChangedEvent = true;

            that.layer.clear();

            that.markSaved();

            that.preventLayerChangedEvent = false;

            that.topology_properties = {};
        }

        if(!that.isSaved()) {

            bootbox.dialog({
                message: "Your work is not saved yet! Continue will discard all changes!",
                title: "Warning",
                buttons: {
                    success: {
                        label: "Continue",
                        className: "btn-success",
                        callback: new_func
                    },
                    danger: {
                        label: "Back",
                        className: "btn-danger",
                        callback: function() {
                            return;
                        }
                    }
                }
            });

        } else {
            new_func();
        }
   },

    /**
     * @method onDelete
     */
    onDelete: function() {
        var that = this;

        bootbox.dialog({
            message: "Are you sure you want to delete this topology?",
            title: "Warning",
            buttons: {
                success: {
                    label: "Yes",
                    className: "btn-success",
                    callback: function() {
                        var d = that.getValue(false);
                        $.when(d).done(function(value) {
                            that.adapter.deleteTopology({name: value.name, language: that.options.languageName},{
                                success: function(result) {
                                    that.preventLayerChangedEvent = true;

                                    that.layer.clear();

                                    that.markSaved();

                                    that.preventLayerChangedEvent = false;

                                    that.topology_properties = {};

                                    bootbox.alert("Topology deleted!");
                                },
                            failure: function(errorStr) {
                                    bootbox.alert("Unable to delete topology: "+errorStr);
                                },
                                scope: that
                            });
                        });
                    }
                },
                danger: {
                    label: "No",
                    className: "btn-danger",
                    callback: function() {
                        return;
                    }
                }
            }
        });

    },

    /**
     * @method renderLoadPanel
     */
    renderLoadPanel: function() {
        if( !this.loadPanel) {
            this.loadPanel = new widget.Panel('TopologyEditor-loadPanel', {
                fixedcenter: true,
                draggable: true,
                width: '500px',
                visible: false,
                modal: true
            });
            this.loadPanel.setHeader("Select the topology to load");
            this.loadPanel.setBody("Filter: <input type='text' id='loadFilter' /><div id='loadPanelBody'></div>");
            this.loadPanel.render(document.body);

            // Listen the keyup event to filter the module list
            Event.onAvailable('loadFilter', function() {
                Event.addListener('loadFilter', "keyup", this.inputFilterTimer, this, true);
            }, this, true);

        }
    },

    /**
     * Method called from each keyup on the search filter in load panel.
     * The real filtering occurs only after 500ms so that the filter process isn't called too often
     */
    inputFilterTimer: function() {
        if(this.inputFilterTimeout) {
            clearTimeout(this.inputFilterTimeout);
            this.inputFilterTimeout = null;
        }
        var that = this;
        this.inputFilterTimeout = setTimeout(function() {
            that.updateLoadPanelList(Dom.get('loadFilter').value);
        }, 500);
    },


    /**
     * @method updateLoadPanelList
     */
    updateLoadPanelList: function(filter) {

        this.renderLoadPanel();

        var list = WireIt.cn("ul");
        if(lang.isArray(this.pipes)) {
            for(var i = 0 ; i < this.pipes.length ; i++) {
                var pipe = this.pipes[i];
                if(!filter || filter === "" || pipe.name.match(new RegExp(filter,"i")) ) {
                    list.appendChild( WireIt.cn('li',null,{cursor: 'pointer'},pipe.name) );
                }
            }
        }
        var panelBody = Dom.get('loadPanelBody');

        // Purge element (remove listeners on panelBody and childNodes recursively)
        YAHOO.util.Event.purgeElement(panelBody, true);

        panelBody.innerHTML = "";
        panelBody.appendChild(list);

        Event.addListener(list, 'click', function(e,args) {
            this.loadPipe(Event.getTarget(e).innerHTML);
        }, this, true);

    },

    /**
     * Start the loading of the pipes using the adapter
     * @method load
     */
    load: function(showDialog) {
        this.adapter.listTopologies({language: this.options.languageName},{
            success: function(result) {
                this.onLoadSuccess(result, showDialog);
            },
            failure: function(errorStr) {
                bootbox.alert("Unable to load the topologies: "+errorStr);
            },
            scope: this
        });

    },

    /**
     * @method onLoadSuccess
     */
    onLoadSuccess: function(topologies, showDialog) {

        // Reset the internal structure
        this.pipes = topologies;
        this.pipesByName = {};

        // Build the "pipesByName" index
        for(var i = 0 ; i < this.pipes.length ; i++) {
            this.pipesByName[this.pipes[i].name] = this.pipes[i];
        }

        this.updateLoadPanelList();

        showDialog = (showDialog === undefined) || showDialog;

        // Check for autoload param and display the loadPanel otherwise
        if(!this.checkAutoLoad() && showDialog) {
            this.loadPanel.show();
        }
    },

    /**
     * checkAutoLoad looks for the "autoload" URL parameter and open the pipe.
     * returns true if it loads a Pipe
     * @method checkAutoLoad
     */
    checkAutoLoad: function() {
        if(!this.checkAutoLoadOnce) {
            var p = window.location.search.substr(1).split('&');
            var oP = {};
            for(var i = 0 ; i < p.length ; i++) {
                var v = p[i].split('=');
                oP[v[0]]=window.decodeURIComponent(v[1]);
            }
            this.checkAutoLoadOnce = true;
            if(oP.autoload) {
                this.loadPipe(this.getPipeNameById(oP.autoload));
                return true;
            }
        }
        return false;
    },

    /**
     * @method getPipeByName
     * @param {String} name Pipe's name
     * @return {Object} return the pipe configuration
     */
    getPipeByName: function(name) {
        var n = this.pipes.length,ret;
        for(var i = 0 ; i < n ; i++) {
            if(this.pipes[i].name == name) {
                return this.pipes[i].working;
            }
        }
        return null;
    },

    /**
     * @method getPipeNameById
     * @param {String} id Pipe's id
     * @return {String} return the pipe name
     */
    getPipeNameById: function(id) {
        var n = this.pipes.length,ret;
        for(var i = 0 ; i < n ; i++) {
            if(this.pipes[i].id == id) {
                return this.pipes[i].name;
            }
        }
        return null;
    },

    /**
     * @method loadPipe
     * @param {String} name Pipe name
     */
    loadPipe: function(name) {
        if(!this.isSaved()) {

            bootbox.dialog({
                message: "Your work is not saved yet! Continue will discard all changes!",
                title: "Warning",
                buttons: {
                    success: {
                        label: "Continue",
                        className: "btn-success",
                        callback: function() {
                        }
                    },
                    danger: {
                        label: "Back",
                        className: "btn-danger",
                        callback: function() {
                            return;
                        }
                    }
                }
            });
        }

        try {

            this.preventLayerChangedEvent = true;
            this.loadPanel.hide();

            var topology = this.getPipeByName(name);

            if(!topology) {
                bootbox.alert("The topology '"+name+"' was not found.");
                return;
            }

            // TODO: check if current topology is saved...
            this.layer.clear();

            this.topology_properties = topology.properties;

            if(lang.isArray(topology.modules)) {

                // Containers
                for(i = 0 ; i < topology.modules.length ; i++) {
                    var m = topology.modules[i];
                    if(this.modulesByName[m.name]) {
                        var baseContainerConfig = this.modulesByName[m.name].container;
                        YAHOO.lang.augmentObject(m.config, baseContainerConfig);
                        m.config.title = m.name;
                        m.config.storm_type = m.storm_type;
                        m.config.emitedFields = m.emitedFields;
                        m.config.requiredFields = m.requiredFields;
                        var container = this.layer.addContainer(m.config);
                        Dom.addClass(container.el, "TopologyEditor-module-"+m.name);
                        container.setValue(m.value);
                    }
                    else {
                        throw new Error("TopologyEditor: module '"+m.name+"' not found !");
                    }
                }

                // Wires
                if(lang.isArray(topology.wires)) {
                    for(i = 0 ; i < topology.wires.length ; i++) {
                        // On doit chercher dans la liste des terminaux de chacun des modules l'index des terminaux...
                        this.layer.addWire(topology.wires[i]);
                    }
                }
            }

            this.markSaved();

            this.preventLayerChangedEvent = false;

        }
        catch(ex) {
            bootbox.alert(ex);
            if(window.console && YAHOO.lang.isFunction(console.log)) {
                console.log(ex);
            }
        }
    },


    onLayerChanged: function() {
        if(!this.preventLayerChangedEvent) {
            this.markUnsaved();
        }
    },


    /**
     * This method return a topology within the given vocabulary described by the modules list
     * @method getValue
     */
    getValue: function(requireName) {
        var i;
        var obj = {modules: [], wires: [], properties: null};

        for( i = 0 ; i < this.layer.containers.length ; i++) {
            var container = this.layer.containers[i];
            obj.modules.push( {
                storm_type : container.storm_type,
                emitedFields : container.emitedFields,
                requiredFields : container.requiredFields,
                name: container.title,
                value: container.getValue(),
                config: container.getConfig()
            });
        }

        for( i = 0 ; i < this.layer.wires.length ; i++) {
            var wire = this.layer.wires[i];
            var wireObj = wire.getConfig();
            wireObj.src = {moduleId: WireIt.indexOf(wire.terminal1.container, this.layer.containers), terminal: wire.terminal1.name };
            wireObj.tgt = {moduleId: WireIt.indexOf(wire.terminal2.container, this.layer.containers), terminal: wire.terminal2.name };
            obj.wires.push(wireObj);
        }

        promptAlert = (requireName === undefined);

        var d1 = new $.Deferred();
        var d2 = new $.Deferred();
        var that = this;

        if (promptAlert) {
            that.save_topology = false;

            if (that.topology_properties.name === undefined) { that.topology_properties.name = ""; }

            bootbox.dialog({
                title: "Topology name?",
                message:    '<form class="bootbox-form"> ' +
                                '<input id="topology_name" name="topology_name" onkeypress="if (event.which == 13) {event.preventDefault(); return false;}" class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" placeholder="Topology name" value="'+that.topology_properties.name+'"> ' +
                            '</form>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            that.topology_properties.name = $('#topology_name').val();
                            that.save_topology = true;
                            d2.resolve();
                        }
                    },
                    danger: {
                        label: "Back",
                        className: "btn-danger",
                        callback: function() {
                            that.save_topology = false;
                            d2.resolve();
                        }
                    }

                }
            });

        } else {
            d2.resolve();
        }

        $.when( d2 ).done(function( x ) {

            obj.properties = that.topology_properties;

            d1.resolve(
                {
                    name: obj.properties.name,
                    working: obj,
                    save_topology : that.save_topology
                }
            );

        });

        return d1.promise();

    }


});


/**
 * TopologyEditor Adapters
 * @static
 */
 WireIt.TopologyEditor.adapters = {};


})();
