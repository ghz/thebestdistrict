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
                this.districts = new Districts();
                this.count = 3;
                this.render();
                this._events();
            },

            events : {
                'click .submit-search' : 'send',
            },

            _events : function() {
                var self = this;
                this.districts.bind('add', this.added, this);
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
            send : function() {

                var endpoints = ['07fc','02Pi','m58t','r41k'], l = endpoints.length;

               // note finale = (c1 * (p1/15) + c2 * (p2/15) + c3 * (p3/15) + c4 * (p4/15))
               /*
               
[31/10/13 16:02:46] Gilles Humez: c = coeef
p = position dans la liste

note_finale_quatier_1 = (c_edu * (position_dans_la_liste_edu_de_quartier_1/15) + c_transp * (position_dans_la_liste_transport_de_quartier_1/15) + ...
[31/10/13 16:03:59] Gilles Humez: scom une moyenne

1er trimettre = 14,6 en maths * coeff_maths + ...
[31/10/13 16:04:03] soyuka: position_dans_la_liste_edu_de_quartier_1 => ça veut rien dire ça ?! je la trouve où cette position ?
[31/10/13 16:04:25] Gilles Humez: les 4 endpoints sont rangés différemment nn ?
[31/10/13 16:04:28] soyuka: yep
[31/10/13 16:04:40] Gilles Humez: on suppose que le 1er = le best

                */
                while(l--) {
                    this.districts.url = "http://api.batcave.stras.io:3001/e/" + endpoints[l];
                    this.districts.fetch();
                }
               
            },
            added : function(res) {
                this.count--;

                if(this.count == 0)
                    this.getResult();
            },
            getResult : function() {
                this.count = 3;

                var sliders = $("#sliders .slider");
                
                var coeffs = [];

                // var sum = 0;
                // sum += $(this).slider('value');

                sliders.each(function(i) {
                    coeffs.push($(this).slider('value') / 100);
                });

                console.log(this.districts);
                //For each districts
                // var j = this.districts.length;

                // while(j--) {
                //     //for each district
                //     var district = this.districts[j], l = district.models[0].attributes.results.length;
                //     console.log(district.models[0].attributes.results);
                //     while(l--) {

                //     }

                // }


                    // while(l--) {
                    //     note_finale += coef * (l+1)/15
                    // }

                // var l = this.districts.

                    // var l = this.districts.length;

                    // while(l--) {

                    // }
                    // 
                    // 
            }
          
        });
    });