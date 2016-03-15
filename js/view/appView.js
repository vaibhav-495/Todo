var app = app || {};
app.AppView = Backbone.View.extend({
    el:'<div><ul class="todo-list"></ul><footer class="list-footer"></footer></div>',

    template : _.template($("#item-footer").html()),

    events: {
        'click .clear' : 'clearCompleted',
        'click .done-todo': function () {this.render(app.todoList.getDone());},
        'click .left-todo': function () {this.render(app.todoList.getRemaining());},
        'click .all-todo' : 'render'
    },

    initialize: function(){
        var that = this;
        that.jTodoList = that.$el.find(".todo-list");
        that.jFooter = that.$el.find('.list-footer');

        app.todoList.on("remove",this.render,this);
        app.todoList.on("add", this.addOne, this);
        app.todoList.on("all", this.updateFooter , this);

        app.todoList.fetch();
    },

    render : function (todos) {
        var models = app.todoList.models,
            that = this;
        if (Array.isArray(todos)) {
            models = todos;
        }
        this.jTodoList.html('');
        models.forEach(function (model){
            that.addOne(model);
        });
        this.updateFooter();
        return this;
    },

    updateFooter : function () {
        var remaining = app.todoList.getRemaining().length;
        $(this.jFooter).html(this.template({left : remaining}));
    },

    addOne: function(todo){
        var view=new app.todoView({model:todo});
        $(this.jTodoList).append(view.render().el);
    },

    addTodo: function(con){
        app.todoList.create({content: con,completed:false});
    },

    clearCompleted : function () {
        var doneModels = app.todoList.getDone();
        doneModels.forEach(function (model) {
            model.destroy();
        })
    }
});
