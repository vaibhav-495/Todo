var app = app || {};
app.AppView = Backbone.View.extend({
    el:"#wrapper",
    events: {
        "keydown .input__field" : "keyPressEventHandler",
        "click #delete-all" : "deleteAllTodos"
    },

    initialize: function(){
        this.input = $(".input__field");
        this.parentDiv = $("#todo-list");
        app.todoList.on("add reset remove",this.addAll,this);
        app.todoList.fetch();
    },

    addAll: function(){
        this.parentDiv.html('');
        app.todoList.each(this.addOne,this);
    },
    addOne: function(todo){
        var view=new app.todoView({model:todo});
        this.parentDiv.append(view.render().el);
    },
    addTodo: function(){
        var con=this.input.val().trim();
        this.input.val('');
        if(!con) {
            return;
        }
        app.todoList.create({content: con,completed:false});
    },
    keyPressEventHandler : function(event){
        if(event.keyCode == 13){
            this.addTodo();
        }
    },
    deleteAllTodos: function(){
        var model;
        while (model = app.todoList.first()) {
            model.destroy();
        }
    }
});
app.appview=new app.AppView();