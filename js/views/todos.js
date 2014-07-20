require(['jquery', 'backbone', 'juicer'], function ($, Backbone, juicer) {
    var app = app || {};

    var TodoView = Backbone.view.extend({
        tagName: 'li',
        template: juicer($('#todo-tpl').html()),
        render: function () {
            this.$el.html(this.template.render(this.model.toJSON()));
        }
    });
});