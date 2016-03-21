import $ from "jquery";

import _ from "underscore";

import Backbone from "backbone";

import LocalStorage from "backbone.localstorage";

import todoList from "../collection/todoCollection";

import todoView from "./todoView";

module.exports = Backbone.View.extend({
    el:'<div><div class="todo-view__list"></div><div class="todo-view__footer"></div></div>',

    template : _.template($("#item-footer").html()),

    events: {
        'click .todo-view__footer__clear' : 'clearCompleted',
        'click .todo-view__footer__done': function () {this.render(todoList.getDone());},
        'click .todo-view__footer__left': function () {this.render(todoList.getRemaining());},
        'click .todo-view__footer__all' : 'render'
    },

    initialize: function(){
        var that = this;
        that.jTodoList = that.$el.find(".todo-view__list");
        that.jFooter = that.$el.find('.todo-view__footer');

        todoList.on("remove",this.render,this);
        todoList.on("add", this.addOne, this);
        todoList.on("all", this.updateFooter , this);

        todoList.fetch();
    },

    render : function (todos) {
        var models = todoList.models,
            str = '',
            that = this,
            frag = document.createDocumentFragment();

        if (Array.isArray(todos)) {
            models = todos;
        }
        this.jTodoList.html('');
        models.forEach(function (model){
            frag.insertBefore(that.addOneStr(model),frag.firstChild);
        });
        $(this.jTodoList).append(frag);
        this.updateFooter();
        return this;
    },
    updateFooter : function () {
        var remaining = todoList.getRemaining().length;
        $(this.jFooter).html(this.template({left : remaining}));
    },
    addOne: function(todo){
        var view = new todoView({model:todo});
        $(this.jTodoList).prepend(view.render().el);
    },
    addOneStr : function(todo){
        var view = new todoView({model:todo});
        return view.render().el;
    },
    addTodo: function(con){
        todoList.create({content: con,completed:false});
    },

    clearCompleted : function () {
        var doneModels = todoList.getDone();
        doneModels.forEach(function (model) {
            model.destroy();
        })
    }
});
