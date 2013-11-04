define([
    'underscore',
    'backbone'
], function( _, Backbone){
    return Backbone.Collection.extend({
        url: function() {
            return 'http://api.stras.io/e/' + this.endpointId;

        },
        initialize: function(endpointId) {
        	this.endpointId = endpointId;
        	this.fetch();
        }

    });
});