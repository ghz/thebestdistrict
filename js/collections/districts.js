define([
    'underscore',
    'backbone',
    'models/district'
], function( _, Backbone, District){
    return Backbone.Collection.extend({
        model: District,

        url: function() {
            return '';
        }
    });
});