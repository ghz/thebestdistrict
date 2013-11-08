define([
    'backbone',
    'collections/districts',
    'BigVideo',
    'jquery-ui'
//    ,
//    'libs/BigVideo/lib/bigvideo'
],
    function(
        Backbone,
        Districts,
        bigvideo,
        jqueryui
        ){
        return  Backbone.View.extend({
            el: '#app',

            nb_quartiers_affiches: 3,

            initialize: function()
            {
                this.districtSortByEducation = new Districts('07fc');
                this.districtSortByTransport = new Districts('02Pi');
                this.districtSortByHobbies = new Districts('m58t');
                this.districtSortByEcology = new Districts('r41k');

                this.render();
            },

            events : {
                'click .submit-search' : 'getResult'
            },
            /**
            * Similar to _.find but return the first index of the array matching the iterator
            **/
            findIndex :  function(arr, iterator) {
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
                var sliders = $("#sliders .slider");
                
                var coeffs = [], 
                    districts = [
                        this.districtSortByEducation.first().get('results'),
                        this.districtSortByTransport.first().get('results'),
                        this.districtSortByHobbies.first().get('results'),
                        this.districtSortByEcology.first().get('results'),
                    ];

                sliders.each(function(i) {
                    coeffs.push($(this).slider('value') / 100);
                });

                var nb_districts = districts.length;
                var notes = {};

                //Caclul des notes
                for (var i = 0; i < nb_districts; i++) {

                    var l = districts[i].length;

                    //ajout des notes sur es quartiers
                    while(l--) {
                        var q_id = districts[i][l].id_quartier;

                        var note_quartier = 0;

                        for(var j in coeffs)
                            note_quartier += coeffs[j] * ( parseInt( 
                                                                this.findIndex(
                                                                    districts[j], 
                                                                    function(val) { return parseInt(val.id_quartier) == q_id }
                                                                ) 
                                                            ) + 1 ) / 15;

                        if(typeof notes[q_id] == 'object')
                            notes[q_id][i] = note_quartier;
                        else {
                            notes[q_id] = {};
                            notes[q_id][i] = note_quartier;
                        }

                    }

                }

                //Just needed a sorted item
                var quartiers = _.sortBy(districts[0], function(q){ return parseInt(q.id_quartier); }), quartiersCopy = [];

                for(var q_id in notes) {
                    var moyenne = 0;

                    for(var k = 0; k < nb_districts; k++)
                        moyenne += notes[q_id][k];

                    moyenne = moyenne / nb_districts; 
                    
                    quartiersCopy.push(_.extend({note : moyenne, note_format : Math.round( moyenne*100) / 10}, quartiers[q_id]));
                }
                
                quartiers = _.sortBy(quartiersCopy, function(q){ return q.note; });

                delete quartiersCopy;

                this.bestDistricts = quartiers;

                this.renderDistricts();

            },

            renderDistricts : function() {
                if(this.bestDistricts.length) {
                    $('#results').empty().append('<ol />');

                    var from = this.bestDistricts.length - 1, to = this.bestDistricts.length - this.nb_quartiers_affiches;

                    for(var i = from; i >= to ; i--)
                        $('#results ol').append('<li>'+this.bestDistricts[i]['nom']+' '+ this.bestDistricts[i]['note_format']+'/10</li>');
                }
            }
          
        });
    });