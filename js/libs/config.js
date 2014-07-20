requirejs.config({
    baseUrl: 'js/',

    paths: {
        'jquery': 'libs/jquery',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'backboneLocalStorage': 'libs/backbone-localsotrage',
        'juicer': 'libs/juicer-min'
    },

    shim: {
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        },

        'backboneLocalStorage': {
            deps: ['backbone']
        },

        'underscore': {
            exports: '_'
        },

        'juicer': {
            exports: 'juicer'
        }
    }
});