module.exports = {
    singleton: function() {

    },
    /**
     * If mixin extend from another 
     */
    mixin: function(target, mixin) {
        for (var property in mixin) {
            target.__proto__[property] = mixin[property];
        }
    },    
    inheritance: function (Parent, Child) {
        function F() {}
        F.prototype = Parent.prototype;
        Child.prototype = new F();
    },

    createClass: function(object, Parent, router) {
        return function() {
            Parent && Parent.call(this, router);
            for (property in object || {})
                this[property] = object[property];
        };
    },
    inherit: function(Child, Parent) {
        Child.prototype = new Parent();
        Child.prototype.constructor = Child;
    }
};