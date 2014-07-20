require(['jquery', 'backbone', 'juicer'], function ($, Backbone, juicer) {
    var app = {};

    app.TodoModel = Backbone.Model.extend({
        defaults: {
            title: null,
            completed: false
        }
    });

    var TodoCollection = Backbone.Collection.extend({
        model:  app.todoModel
    });

    app.todoCollection = new TodoCollection();

    app.AppView = Backbone.View.extend({
        el: '#todoApp',

        initialize: function () {
            this.$newTodo = this.$('#todo-new');
            this.$todoList = this.$('#todo-list');

            this.listenTo(app.todoCollection, 'add', this.addTodo)
        },

        events: {
            'keyup #todo-new': 'createTodo'
        },

        createTodo: function (e) {
            // 如果没有按下回车键或TODO内容为空
            if (e.which !== 13 || !this.$newTodo.val().trim()) return;

            console.log('trigger')

            // TODO:创建新的TODO
            app.todoCollection.create({title: 'a', completed: false})
        },

        addTodo: function (todo) {
            var todo = new app.todoView({model: todo});
            this.$todoList.append(todo.render().el);
        }
    });

    app.todoView = Backbone.View.extend({
        tagName: 'li',

        template: juicer($('#todo-tpl').html()),

        render: function () {
            this.template.render(this.model.toJSON());
        }
    });

    new app.AppView();
});