/**
* Similar to _.find but return the first index of the array matching the iterator
**/
var findIndex = function(arr, iterator) {
    var i = arr.length - 1, index = null;

    if(i >= 0){
        do {
            if(iterator(arr[i])) {
                index = i;
                break;
            }
        } while(i--)
    }

    return index;
}

define([
    'backbone',
    'models/district',
    'collections/districts',
    'BigVideo',
    'jquery-ui'
//    ,
//    'libs/BigVideo/lib/bigvideo'
],
    function(
        Backbone,
        District,
        Districts,
        bigvideo,
        jqueryui
        ){
        return  Backbone.View.extend({
            el: '#app',

            initialize: function()
            {
                this.districtSortByEducation = new Districts('07fc');
                this.districtSortByTransport = new Districts('02Pi');
                this.districtSortByHobbies = new Districts('m58t');
                this.districtSortByEcology = new Districts('r41k');

                this.nb_quartiers_affiches = 4;

                this.render();
                this._events();
            },

            events : {
                'click .submit-search' : 'getResult',
            },

            _events : function() {
                // var self = this;
                // this.districtSortByEducation.bind('add', this.added, this);
                // this.districtSortByTransport.bind('add', this.added, this);
                // this.districtSortByHobbies.bind('add', this.added, this);
                // this.districtSortByEcology.bind('add', this.added, this);
            },

            render: function() {

                var BV = new $.BigVideo();
                BV.init();
                if (Modernizr.touch || Modernizr.touchevents || window.navigator.msPointerEnabled) {
                    BV.show('videos/bestDistrict.jpg');
                } else {
                    BV.show('videos/bestDistrict.mp4',{ambient:true});
                }

                var sliders = $("#sliders .slider");
                var availableTotal = 100;

                sliders.each(function() {
                  
                  var init_value = parseInt($(this).text());

                  $(this).siblings('.value').text(init_value);

                  $(this).empty();

                  $(this).slider({
                        value: init_value,
                        min: 0,
                        max: availableTotal,
                        range: "max",
                        step: 2,
                        animate: 0,
                        slide: function(event, ui) {
                          
                            // Update display to current value
                            $(this).siblings('.value').text(ui.value);

                            // Get current total
                            var total = 0;

                            sliders.not(this).each(function() {
                              total += $(this).slider("option", "value");
                            });

                            // Need to do this because apparently jQ UI
                            // does not update value until this event completes
                            total += ui.value;

                            var delta = availableTotal - total;

                            // Update each slider
                            sliders.not(this).each(function() {
                              var t = $(this),
                                  value = t.slider("option", "value");

                              var new_value = value + (delta/2);
                              
                              if (new_value < 0 || ui.value == 100) 
                                  new_value = 0;
                              if (new_value > 100) 
                                  new_value = 100;

                              t.siblings('.value').text(new_value);
                              t.slider('value', new_value);
                            });
                        }
                    });
                });
            },
            getResult : function() {
                this.count = 3;

                var sliders = $("#sliders .slider");
                
                var coeffs = [], 
                    districts = [
                        this.districtSortByEducation.first().attributes.results,
                        this.districtSortByTransport.first().attributes.results,
                        this.districtSortByHobbies.first().attributes.results,
                        this.districtSortByEcology.first().attributes.results,
                    ];

                sliders.each(function(i) {
                    coeffs.push($(this).slider('value') / 100);
                });

                //Choisir ou rand ?
                var quartiers = districts[_.random(0, 3)], l = quartiers.length;

                //Sort ?
                // quartiers = _.sortBy(quartiers, function(q){ return parseInt(q.id_quartier); });

                //ajout des notes sur es quartiers
                while(l--) {
                    var q_id = quartiers[l].id_quartier;

                    var note_quartier = 0;

                    for(var i in coeffs) {
                        note_quartier += coeffs[i] * ( findIndex(districts[i], function(val) { return parseInt(val.id_quartier) == q_id }) / 15 );
                    }

                    quartiers[l].note = note_quartier;
                }

                quartiers = _.sortBy(quartiers, function(q){ return q.note; });

                
                this.bestDistricts = quartiers.splice(0, this.nb_quartiers_affiches);
                this.domDistricts();
            },
            domDistricts : function() {
                $('#results').empty().append('<ol />');

                for(var i in this.bestDistricts)
                    $('#results ol').delay(i*100).append('<li>'+this.bestDistricts[i]['nom']+'</li>');
                
            }
          
        });
    });