import $ from "jquery";

import _ from "underscore";

import Backbone from "backbone";

import LocalStorage from "backbone.localstorage";


module.exports = Backbone.View.extend({

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
        this.$el.toggleClass("checked" , this.model.getCompleted());
        console.log(this.model.getCompleted());
        return this;
    },

    toggleTodo: function(){
        this.model.toggle();
    },

    deleteTodo: function(){
        this.model.destroy();
    }

});