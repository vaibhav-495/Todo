import $ from "jquery";

import _ from "underscore";

import Backbone from "backbone";

import LocalStorage from "backbone.localstorage";

var deleteTodo = function(){
        this.model.destroy();
    },

    toggleTodo = function(){
        this.model.toggle();
    };

module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'todo-view__list__item',
    template: _.template($('#item-template').html()),

    events: {
        'click .todo-view__list__item__toggle': function () {
                toggleTodo.call(this);
        },
        "click .todo-view__list__item__delete": function () {
                deleteTodo.call(this)
        },
    },

    initialize : function () {
       this.model.on("change" , this.render, this);
       this.model.on("remove" , this.clean, this);
    },

    clean : function () {
        this.$el.off();
        this.unbind();
        this.undelegateEvents();
        this.remove();
    },

    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass("checked" , this.model.getCompleted());
        return this;
    }

});