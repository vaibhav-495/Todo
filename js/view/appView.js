import $ from "jquery";

import _ from "underscore";

import Backbone from "backbone";

import LocalStorage from "backbone.localstorage";

import todoList from "../collection/todoCollection";

import todoView from "./todoView";

module.exports = Backbone.View.extend({
    el:'<div><div class="todo-view__list todo-list"></div><footer class="list-footer"></footer></div>',

    template : _.template($("#item-footer").html()),

    events: {
        'click .clear' : 'clearCompleted',
        'click .done-todo': function () {this.render(todoList.getDone());},
        'click .left-todo': function () {this.render(todoList.getRemaining());},
        'click .all-todo' : 'render'
    },

    initialize: function(){
        var that = this;
        that.jTodoList = that.$el.find(".todo-list");
        that.jFooter = that.$el.find('.list-footer');

        todoList.on("remove",this.render,this);
        todoList.on("add", this.addOne, this);
        todoList.on("all", this.updateFooter , this);

        todoList.fetch();
    },

    render : function (todos) {
        var models = todoList.models,
            str = '',
            that = this;
        if (Array.isArray(todos)) {
            models = todos;
        }
        this.jTodoList.html('');
        
        models.forEach(function (model){
            str = that.addOneStr(model) + str;
        });
        $(this.jTodoList).html(str);
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
        console.log($('<div>').append($(view.render().el)).html());
        //console.log ($(view.render().el).parent().html(),view.render().el);
        return $(view.render().el).parent().html();
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
