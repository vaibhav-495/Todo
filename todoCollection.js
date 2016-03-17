var app = app||{};

app.TodoList= Backbone.Collection.extend({
    model: app.Todo,
    localStorage: new Store("backbone-todo"),

    getRemaining : function () {
        return this.where({completed:false});
    },

    getDone : function() {
        return this.where({completed:true});
    }
});


app.todoList = new app.TodoList();