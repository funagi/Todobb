require('backbone', function (Backbone) {
   var app = app || {};

   app.todoModel = Backbone.Model.extend({
       defaults: {
            title: '',
            completed: false
       }
   });
});