/**
 * WireIt editor
 * @module editor-plugin
 */
(function() {
    var util = YAHOO.util,lang = YAHOO.lang;
    var Event = util.Event, Dom = util.Dom, Connect = util.Connect,JSON = lang.JSON,widget = YAHOO.widget;

/**
 * The BaseEditor class provides a full page interface 
 * @class BaseEditor    
 * @namespace WireIt
 * @constructor
 * @param {Object} options (layoutOptions)
 */
WireIt.BaseEditor = function(options) {

    /**
    * Container DOM element
    * @property el
    */
    this.el = Dom.get(options.parentEl);
    
    // set the default options
    this.setOptions(options);

    // Rendering
    this.render();
   
};

/**
 * Default options for the BaseEditor
 */
WireIt.BaseEditor.defaultOptions = {
    layoutOptions: {
        units: [
//        { position: 'top', height: 68, body: 'top'},
//        { position: 'left', width: 195, body: 'left' },
        { position: 'center', body: 'editor_container' },
//        { position: 'right', width: 320, resize: true, body: 'right', gutter: '5px', collapse: true, collapseSize: 25, /*header: 'Properties', scroll: true,*/ animate: true }
//        { position: 'bottom', height: 33, body: 'bottom',}
        ]
    },  

};

WireIt.BaseEditor.prototype = {

    /**
     * @method setOptions
     * @param {Object} options
     */
    setOptions: function(options) {

        /**
         * @property options
         * @type {Object}
         */
        this.options = {};

        // YUI layout options
        this.options.layoutOptions = options.layoutOptions || WireIt.BaseEditor.defaultOptions.layoutOptions;
    },

    /**
     * Render the layout & panels
     */
    render: function() {

        // Adjust editor height
        $(document).ready(function() {
            var bodyheight = $(document).height();
            //alert("hola1: "+bodyheight);
            $("#editor_container").height(bodyheight-101);
        });

        $(window).resize(function() {
            var bodyheight = $(document).height();
            //alert("hola2: " + bodyheight);
            $("#editor_container").height(bodyheight-189);
        });

        /**
         * @property layout
         * @type {YAHOO.widget.Layout}
         */
        this.layout = new widget.Layout(this.el, this.options.layoutOptions);
        this.layout.render();

        // Render buttons
        this.renderButtons();

        // Saved status
        this.renderSavedStatus();

    },
 
    /**
     * Toolbar
     * @method renderButtons
     */
    renderButtons: function() {
        // Buttons :

        var newButton = $('#new_topology');
        newButton.on("click", null, null, $.proxy(this.onNew, this));

        var loadButton = $('#load_topology');
        loadButton.on("click", null, null, $.proxy(this.load, this));

        var saveButton = $('#save_topology');
        saveButton.on("click", null, null, $.proxy(this.onSave, this));

        var deleteButton = $('#delete_topology');
        deleteButton.on("click", null, null, $.proxy(this.onDelete, this));
    },

    /**
     * @method renderSavedStatus
     */
    renderSavedStatus: function() {
        this.savedStatusEl = WireIt.cn('div', {className: 'savedStatus', title: 'Not saved'}, {display: 'none'}, "Not saved");
//        Dom.get('toolbar').appendChild(this.savedStatusEl);
    },

    /**
     * @method onSave
     */
    onSave: function() {
        $.proxy(this.save, this)();
    },

    /**
     * Save method (empty)
     */
    save: function() {
        // override
    },

    /** 
     * Hide the save indicator
     */
     markSaved: function() {
        this.savedStatusEl.style.display = 'none';
    },

    /** 
     * Show the save indicator
     */
     markUnsaved: function() {
        this.savedStatusEl.style.display = '';
    },

    /** 
     * Is saved ?
     */
     isSaved: function() {
        return (this.savedStatusEl.style.display == 'none');
    }

};


})();