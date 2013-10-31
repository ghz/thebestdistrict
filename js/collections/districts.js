define([
    'underscore',
    'backbone',
    'models/district'
], function( _, Backbone, District){
    return Backbone.Collection.extend({
        model: District,

        url: function() {
            return 'http://api.batcave.stras.io:3001/e/' + this.endpointId;

        },
        initialize: function(endpointId) {
        	this.endpointId = endpointId;
        	this.fetch();
        }

    });
});