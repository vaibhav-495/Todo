app.todoView=Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#item-template').html()),
    events: {'click .toggle': 'destroy'},
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    destroy: function(){
        this.model.destroy();
            }
})