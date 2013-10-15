// This is the main entry point for the App
define([
  'views/index'
], function(App){
  var init = function()
  {
    this.app = new App();
  };
  
  return { init: init};
});