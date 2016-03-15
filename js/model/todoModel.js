var app = app || {};

app.Todo=Backbone.Model.extend({
    defaults: {
        content: '',
        completed: false
    },
    toggle : function(){
    	this.save({completed : !this.get('completed')});
    }
});