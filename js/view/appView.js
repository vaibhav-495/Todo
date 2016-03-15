var app = app || {};
app.AppView = Backbone.View.extend({
    el:"#wrapper",
    footer : "footer",
    template : _.template($("#item-footer").html()),

    events: {
        'click #save': 'addTodo',
        'click .clear' : 'clearCompleted',
        'click .done-todo': function () {this.addAll(app.todoList.getDone());},
        'click .left-todo': function () {this.addAll(app.todoList.getRemaining());},
        'click .all-todo' : 'addAll'
    },

    initialize: function(){
        this.jInput = $(".input-field");
        this.parentDiv = $("#todo-list");

        app.todoList.on("reset remove",this.addAll,this);
        app.todoList.on("add", this.addOne, this);
        app.todoList.on("all", this.updateFooter , this);

        app.todoList.fetch();
    },

    updateFooter : function () {
        var remaining = app.todoList.getRemaining().length;
        $(this.footer).html(this.template({left : remaining}));
    },

    addAll: function(todos){
        var models = app.todoList.models,
            that = this;
        if (Array.isArray(todos)) {
            models = todos;
        }
        this.parentDiv.html('');
        models.forEach(function (model){
            that.addOne(model);
        })
    },

    addOne: function(todo){
        var view=new app.todoView({model:todo});
        this.parentDiv.append(view.render().el);
    },

    addTodo: function(){
        var con=this.jInput.val().trim();
        this.jInput.val('');
        console.log(con);
        app.todoList.create({content: con,completed:false});
    },

    clearCompleted : function () {
        var doneModels = app.todoList.getDone();
        doneModels.forEach(function (model) {
            model.destroy();
        })
    }
});
app.appview=new app.AppView();