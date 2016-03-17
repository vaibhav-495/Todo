import $ from "jquery";

import _ from "underscore";

import Backbone from "backbone";

import LocalStorage from "backbone.localstorage";

module.exports = Backbone.Model.extend({
    defaults: {
        content: '',
        completed: false
    },

    toggle : function(){
    	this.save({completed : !this.getCompleted()});
    },
    getCompleted : function(){
    	return this.get('completed');
    }

});
