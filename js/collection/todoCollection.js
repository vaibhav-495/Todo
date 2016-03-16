import $ from "jquery";

import _ from "underscore";

import Backbone from "backbone";

import LocalStorage from "backbone.localstorage";

import todoModel from "../model/todoModel";


var TodoList = Backbone.Collection.extend({
    model: todoModel,
    localStorage: new Store("backbone-todo"),

    getRemaining : function () {
        return this.where({completed:false});
    },

    getDone : function() {
        return this.where({completed:true});
    }
});


module.exports = new TodoList();