app.todoView=Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#item-template').html()),
    events: {'click .toggle': 'toggleTodo'},

    initialize : function () {
       this.model.on("change" , this.render, this);
    },

    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('done' , this.model.get("completed"));
        return this;
    },

    toggleTodo: function(){
        this.model.toggle();
    }
});