var app = app || {};
app.AppView = Backbone.View.extend({
    el:"#wrapper",
    events: {
        'click #save': 'addTodo'
    },

    initialize: function(){
        this.input = $(".input-field");
        this.buttonSave = $("#save");
        console.log(this.buttonSave);
        this.parentDiv = $("#todo-list");
        app.todoList.on("add reset remove",this.addAll,this);
        app.todoList.fetch();
    },

    addAll: function(){
        this.parentDiv.html('');
        console.log(app.todoList);
        app.todoList.each(this.addOne,this);
    },
    addOne: function(todo){
        var view=new app.todoView({model:todo});
        this.parentDiv.append(view.render().el);
    },
    addTodo: function(){
        var con=this.input.val().trim();
        this.input.val('');
        console.log(con);
        app.todoList.create({content: con,completed:false});
    }
});
app.appview=new app.AppView();