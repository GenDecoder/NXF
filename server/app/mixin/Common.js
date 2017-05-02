Nx.define('APP.mixin.Common', {
    extend: "APP.mixin.Zase",
    // mixins: ["APP.mixin.Zase"],
    getName: function() {
        console.log("I am a 'getName' mixin <fn>");
    }
});