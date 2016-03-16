app.todoView=Backbone.View.extend({
    tagName: 'div',
    className: 'todo-model-div',
    template: _.template($('#item-template').html()),

    events: {
        'click .template__toggle': 'toggleTodo',
        "click .template__delete": "deleteTodo"
    },

    initialize : function () {
       this.model.on("change" , this.render, this);
    },

    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass("todo-model-div--checked" , this.model.get("completed"));
        return this;
    },

    toggleTodo: function(){
        this.model.toggle();
    },

    deleteTodo: function(){
        this.model.destroy();
    }

});