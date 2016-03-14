var app = app || {};

app.Todo=Backbone.Model.extend({
    defaults: {
        content: '',
        completed: false
    }
});