/**
 * Form container for a single textarea field which is resizeable.
 * Important: this class takes the exact same arguments as the FormContainer !
 * You still need to specify the "fields".
 * @class WireIt.TextareaContainer
 * @extends WireIt.FormContainer
 * @constructor
 * @param {Object}   options  Configuration object (see properties)
 * @param {WireIt.Layer}   layer The WireIt.Layer (or subclass) instance that contains this container
 */
WireIt.TextareaContainer = function(options, layer) {

    WireIt.TextareaContainer.superclass.constructor.call(this, options, layer);

    this.ddResize.eventResize.subscribe(function(e, args) {
        var el = this.form.inputs[0].el;
        YAHOO.util.Dom.setStyle(el, "margin-top", "-15px");
        YAHOO.util.Dom.setStyle(el, "margin-left", "20px");
        YAHOO.util.Dom.setStyle(el, "height", (args[0][1]-80)+"px");
        YAHOO.util.Dom.setStyle(el, "width", (args[0][0]-40)+"px");
    }, this, true);
};

YAHOO.extend(WireIt.TextareaContainer, WireIt.FormContainer, {

});