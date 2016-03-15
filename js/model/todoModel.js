var app = app || {};

app.Todo=Backbone.Model.extend({
    defaults: {
        content: '',
        completed: false
    },

    toggle : function () {
        var completed = this.get("completed");
        this.save({completed:!completed});
    }

});