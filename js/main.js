require.config({
    'baseUrl': './js',
    'paths':
    {
        "underscore": "libs/vendor/underscore",
        "underscore-string": "libs/vendor/underscore-string",
        "underscore-deepextend": "libs/vendor/underscore-deepextend",
        "backbone": "libs/vendor/backbone",
        "backbone-nested": "libs/vendor/backbone-nested",

        "videojs": "libs/video-js/video",
        "BigVideo": "libs/BigVideo/lib/bigvideo",
        "jquery-ui": "libs/jquery-ui/ui/jquery-ui",
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
        'backbone':
        {
            'deps': ['jquery', 'underscore', 'underscore-string', 'underscore-deepextend'],
            'exports': 'Backbone'
        },

        'backbone-nested':
        {
            'deps': ['backbone']
        },

        'underscore-string':
        {
            'deps': ['underscore']
        },

        'underscore-deepextend':
        {
            'deps': ['underscore']
        },
        'jquery-ui' : { 'deps' : ['jquery'] },

        //jQuery UI Components
        //----------------------------------------

        //jQueryUI Libs (js/libs/*)
        //-----------------------------------------

        //Ohter Libs (js/libs/*)
        //-----------------------------------------shim: {
        "videojs": {exports: 'videojs'}
    },

    //SEE http://requirejs.org/docs/api.html#config-waitSeconds
    waitSeconds: 25
});

require([
    'app'
], function(App){
    App.init();
});