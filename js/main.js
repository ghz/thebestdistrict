require.config({
    'baseUrl': './js',
    'paths':
    {
        "underscore": "libs/vendor/underscore",
        "backbone": "libs/vendor/backbone",

        "videojs": "libs/video-js/video",
        "BigVideo": "libs/BigVideo/lib/bigvideo",
        "jquery-ui": "libs/jquery-ui/ui/jquery-ui",
        "jquery.touchpunch": "libs/jquery.touchpunch",
        "imagesloaded": "libs/imagesloaded/imagesloaded",
        "eventEmitter/EventEmitter": "libs/eventEmitter/EventEmitter",
        "eventie/eventie": "libs/eventie/eventie"
    },

    //Load non-modular/legacy code
    //SEE https://github.com/jrburke/requirejs/wiki/Upgrading-to-RequireJS-2.0#wiki-shim
    'shim':
    {
        //Vendor Libs (js/libs/vendor/*)
        //-----------------------------------------
        'backbone': {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        },
        'jquery-ui' : {
            'deps' : ['jquery', 'jquery.touchpunch']
        },


        //Ohter Libs (js/libs/*)
        //-----------------------------------------
        "videojs": {
            exports: 'videojs'
        }
    },

    //SEE http://requirejs.org/docs/api.html#config-waitSeconds
    waitSeconds: 25
});

require([
    'app'
], function(App){
    App.init();
});