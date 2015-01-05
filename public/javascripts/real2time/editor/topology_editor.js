/**
 * The topology editor is overriden to add a button "RUN" to the control bar
 * @class real2time.TopologyEditor
 * @extends WireIt.ComposableTopologyEditor
 */
real2time.TopologyEditor = function(options) {
   real2time.TopologyEditor.superclass.constructor.call(this, options);
};

YAHOO.lang.extend(real2time.TopologyEditor, WireIt.ComposableTopologyEditor, {

    scale: 1,

    zoomOut: function() {

        this.scale -= this.scale*.1;

        if (Math.abs(this.scale*1000-1000) < 50 )
        {
            $(".WireIt-Layer").css("overflow","scroll");
            $("#center").css("overflow","inherit");
            $(".WireIt-Layer").css("transform","none");
            $(".WireIt-Layer").css("width","100%");
            $(".WireIt-Layer").css("height","100%");
            this.scale = 1;
        }
        else
        {
            $(".WireIt-Layer").css("transform-origin","left top");
            $(".WireIt-Layer").css("transform","scale("+this.scale+","+this.scale+")");
            $(".WireIt-Layer").css("width",""+(100*(1/this.scale))+"%");
            $(".WireIt-Layer").css("height",""+(100*(1/this.scale))+"%");
        }
        $(".WireIt-Layer").data("scale",this.scale);
    },

    zoomIn: function() {

        this.scale += (this.scale+.1)*.1;

        if (this.scale > 1 || Math.abs(this.scale*1000-1000) < 50 )
        {
            $(".WireIt-Layer").css("overflow","scroll");
            $("#center").css("overflow","inherit");
            $(".WireIt-Layer").css("transform","none");
            $(".WireIt-Layer").css("width","100%");
            $(".WireIt-Layer").css("height","100%");
            this.scale = 1;
        }
        else
        {
            $(".WireIt-Layer").css("transform-origin","left top");
            $(".WireIt-Layer").css("transform","scale("+this.scale+","+this.scale+")");
            $(".WireIt-Layer").css("width",""+(100*(1/this.scale))+"%");
            $(".WireIt-Layer").css("height",""+(100*(1/this.scale))+"%");
        }
        $(".WireIt-Layer").data("scale",this.scale);
        this.layer.eventChanged.fire(this.layer);
    },


   /**
    * Add Some buttons
    */
    renderButtons: function() {
        real2time.TopologyEditor.superclass.renderButtons.call(this);

        // "Run" button
        var runButton = $('#run_topology');
        var that = this;

        //runButton.on("click", null, null, $.proxy(real2time.run, real2time));

        runButton.on("click", null, null, function() {

            var e = $.proxy(real2time.run, real2time)();

            $.when(e).done(function(value) {

                var jsonStream = new EventSource(value.url + "/run");

                jsonStream.onmessage = function(e) {
                    var message = JSON.parse(e.data);
                    //console.log(message)
                    if (message.compile !== undefined) {
                        that.compile = 100;
                    } else if (message.upload !== undefined) {
                        jsonStream.close();
                        that.upload = 100;
                    }
                }

                var box = bootbox.dialog({
                    title:"Compiling and uploading topology",
                    message:    '<div class="row">' +
                                    '<div class="col-md-6">' +
                                        '<div class="easy-pie-chart">' +
                                            '<div class="number compile" data-percent="0"><span>0 </span>%</div>' +
                                            '<a class="title" href="#">Compile</a>' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="col-md-6">' +
                                        '<div class="easy-pie-chart">' +
                                            '<div class="number upload" data-percent="0"><span>0 </span>%</div>' +
                                            '<a class="title" href="#">Upload</a>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>',
                    closeButton: false,
                });

                $('.easy-pie-chart .number.compile').easyPieChart({
                    animate: 1000,
                    size: 80,
                    lineWidth: 3,
                    barColor: Metronic.getBrandColor('green')
                });

                $('.easy-pie-chart .number.upload').easyPieChart({
                    animate: 1000,
                    size: 80,
                    lineWidth: 3,
                    barColor: Metronic.getBrandColor('red')
                });

                that.compile_upload(box, value.url);

            });

        });

        var zoomInButton = $('#zoom_in_topology');
        zoomInButton.on("click", null, null, $.proxy(this.zoomIn, this));

        var zoomOutButton = $('#zoom_out_topology');
        zoomOutButton.on("click", null, null, $.proxy(this.zoomOut, this));
    },

    compile: 0,
    upload: 0,

    compile_upload: function (box, url) {

        if (this.compile < 100) {
            this.compile = Math.min(100, this.compile + 1);
        } else if (this.upload < 100) {
            this.upload = Math.min(100, this.upload + 1);
        }

        $('.easy-pie-chart .number.compile').data('easyPieChart').update(this.compile);
        $('span', $('.easy-pie-chart .number.compile')).text(this.compile);

        $('.easy-pie-chart .number.upload').data('easyPieChart').update(this.upload);
        $('span', $('.easy-pie-chart .number.upload')).text(this.upload);

        if ((this.compile < 100) ||  (this.upload < 100)) {
            setTimeout($.proxy(this.compile_upload, this), 1000, box, url);
        } else {
            box.modal('hide');
            window.location = url;
        }
}


});
