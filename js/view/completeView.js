/**
 * Created by achut on 3/15/16.
 */

import $ from "jquery";

import _ from "underscore";

import Backbone from "backbone";

import LocalStorage from "backbone.localstorage";

import AppView from "./appView";


var CompleteView = Backbone.View.extend({

    el:"#wrapper",

    events: {
        'keypress .todo__input' : function(e){
            e.keyCode === 13 && this.addTodo();
        }
    },

    initialize: function(){
        this.appView = new AppView();

        this.jInput = $(".todo__input");
        this.render();
    },

    render : function () {
        this.$el.find('.todo-view').html(this.appView.render().el);
    },

    addTodo : function(){

        var input = this.jInput.val().trim();
        if (!input) return;
        this.jInput.val("");
        this.appView.addTodo(input);
    }

});

new CompleteView();