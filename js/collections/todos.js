require(['jquery', 'backbone'], function ($, Backbone) {
    var app = app || {};

    var TodoCollection = Backbone.Collection.extend({
        model: app.todoModel
    });

    app.todoCollection = new TodoCollection();
});