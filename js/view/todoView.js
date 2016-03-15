app.todoView=Backbone.View.extend({
    tagName: 'div',
    className: 'todo-model-div',
    template: _.template($('#item-template').html()),
    events: {
        'click .template__toggle': 'toggleTodo', 
        "click .template__delete": "deleteTodo"
    },
    initialize : function(){
        this.model.on('change', this.toggleTodoView );
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        if(this.model.get("completed")){
            this.$el.addClass("todo-model-div--checked");
        }
        return this;
    },
    toggleTodo: function(){
        this.model.toggle();
        if(this.model.get("completed")){
            this.$el.addClass("todo-model-div--checked");
        }
        else{
            this.$el.removeClass("todo-model-div--checked");
        }

    },
    deleteTodo: function(){
        this.model.destroy();
    }
})