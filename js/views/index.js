define([
    'backbone',
    'models/district',
    'collections/districts',
    'BigVideo'
//    ,
//    'libs/BigVideo/lib/bigvideo'
],
    function(
        Backbone,
        District,
        Districts,
        bigvideo
        ){
        return  Backbone.View.extend({
            el: '#app',

            initialize: function()
            {
                this.render();
                this._events();
            },

            events : {
            },

            _events : function() {},

            render: function() {

                    var BV = new $.BigVideo();
                    BV.init();
                    if (Modernizr.touch || Modernizr.touchevents || window.navigator.msPointerEnabled) {
                        BV.show('videos/bestDistrict.jpg');
                    } else {
                        BV.show('videos/bestDistrict.mp4',{ambient:true});
                    }
            }
        });
    });