/**
 * Created by achut on 3/15/16.
 */


var app = app || {};
app.CompleteView = Backbone.View.extend({

    el:"#wrapper",

    events: {
        'keypress .input__field' : function(e){
            e.keyCode === 13 && this.addTodo();
        }
    },

    initialize: function(){
        app.appview = new app.AppView();

        this.jInput = $(".input__field");
        this.render();
    },

    render : function () {
        this.$el.find('.todo-view').html(app.appview.render().el);
    },

    addTodo : function(){

        var input = this.jInput.val().trim();
        if (!input) return;
        this.jInput.val("");
        app.appview.addTodo(input);
    }

});

app.completeView=new app.CompleteView();