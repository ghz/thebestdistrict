define([
    'underscore',
    'backbone'
], function( _, Backbone){
    return Backbone.Collection.extend({
        url: function() {
            return 'http://api.batcave.stras.io:3001/e/' + this.endpointId;

        },
        initialize: function(endpointId) {
        	this.endpointId = endpointId;
        	this.fetch();
        }

    });
});