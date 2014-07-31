var Todo = {}

Todo.model = Backbone.Model.extend({
	defaults: {
		title: '',
		completed: false
	},
	validate: function (data) {
		if (!data.title.trim()) return false
	}
})

var TodoCollection = Backbone.Collection.extend({
	model: Todo.model,
	localStorage: new Backbone.LocalStorage("todobb"),
	completed: function () {
		return this.filter(function (todo) {
			return todo.get('completed')
		})
	}
})

Todo.collection = new TodoCollection();

Todo.todoView = Backbone.View.extend({
	tagName: 'li',

	className: 'todo-item',

	initialize: function () {
		this.templateConfig()

		this.listenTo(this.model, 'change', this.render)
		this.listenTo(this.model, 'destroy', this.remove)
	},

	templateConfig: function () {
		var completed = function (status) {
			if (status) return 'checked';
		}

		juicer.register('todoStatus', completed)
	},

	template: juicer($('#todo-tpl').html()),

	render: function () {
		this.$el.html(this.template.render(this.model.toJSON()))
		return this
	},

	events: {
		'change .todo-status': 'toggleStatus'
	},

	toggleStatus: function () {
		var status = this.$('.todo-status').attr('checked');
		this.model.set('completed', !status)
	}
})

var AppView = Backbone.View.extend({
	el: '#todo-app',

	initialize: function () {
		this.$addnew = this.$('#todo-addnew')

		this.listenTo(Todo.collection, 'add', this.createNew)

		Todo.collection.fetch()
	},

	events: {
		'keyup #todo-addnew': 'addNew',
		'click #todo-clear': 'clear'
	},

	addNew: function (e) {
		if (e.which !== 13) return

		Todo.collection.create({
			title: this.$addnew.val().trim(),
			completed: false
		}, {validate: true})

		this.$addnew.val('')
	},

	createNew: function (todo) {
		var view = new Todo.todoView({model: todo})
		console.log(view.render().$el.html())
		$('#todo-list').append(view.render().el)
	},

	clear: function () {
		_.invoke(Todo.collection.completed(), 'destroy');
	}
})

new AppView();

