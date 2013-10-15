({
    //Default config
    //--------------------------------------------------------------
    appDir: "./",
    baseUrl: "./",
    dir: "../js",
    keepBuildDir: true,

    //Minification  config
    //--------------------------------------------------------------

    //- "uglify": (default) UglifyJS
    //- "closure": Google's Closure Compiler (Only using Java)
    //- "closure.keepLines": Same as closure option, but keeps line returns in the minified files.
    //- "none": no minification will be done.
    optimize: "uglify",

    //UglifyJS options
    //See https://github.com/mishoo/UglifyJS for the possible values.
    uglify: {
        toplevel: true,
        ascii_only: true,
        beautify: false
        //max_line_length: 1000
    },

    preserveLicenseComments: false,

    //MOAR optimizations, 'cause goo.gl/IwXlX !
    optimizeAllPluginResources: true,

    //Inlines the text for any text! dependencies, to avoid the separate async XMLHttpRequest calls to load those dependencies.
    inlineText: true,


    //Modules definition config
    //--------------------------------------------------------------
    paths: {
        "jquery": "require-jquery",
        "underscore": "libs/vendor/underscore",
        "backbone": "libs/vendor/backbone"
    },

    mainConfigFile: 'main.js',

    modules: [
        //Optimize the require-jquery.js file by applying any minification
        //that is desired via the optimize: setting above.
        {
            name: "require-jquery"
        },
        {
            name: "main",
            exclude: ["jquery"]
        }
    ]
})