module.exports = (function() {
    function Nx() {        
        this.Model;
        this.Resource;
        this.Middleware;
        this.Application;
        this.define = function(){};
    }

    Nx.prototype.setDefine = function(fn) {
        this.define = fn;
    };
    Nx.prototype.setModel = function(model) {
        this.Model = model;
    };
    Nx.prototype.setResource = function(resource) {
        this.Resource = resource;
    };
    Nx.prototype.setMiddleware = function(middleware) {
        this.Middleware = middleware
    };
    Nx.prototype.setApplication = function() {};

    Nx.prototype.cleanDefine = function(fn) {
        this.define = function(){};
    };
    Nx.prototype.removeModel = function() {};
    Nx.prototype.removeResource = function() {};
    Nx.prototype.removeMiddleware = function() {};
    Nx.prototype.removeApplication = function() {};

    return new Nx();
})();

// var object_1 = {a:3};
// var object_2 = {a:4};
// var createSingleton = function(object) {
//     return (function(){
//         function NxSingleton() {
//             for (var property in object)
//                 this[property] = object[property];
//         }
//         var instance;
//         return {
//             getInstance: function() {
//                 if (instance == null) {
//                     instance = new NxSingleton();
//                     // Hide the constructor so the returned objected can't be new'd...
//                     instance.constructor = null;
//                 }
//                 return instance;
//             }
//         };
//     })();
// }

// // if (singleton) {
//     var singleton_1 = createSingleton(object_1);
//     var instance_1 = singleton_1.getInstance();
//     var instance_2 = singleton_1.getInstance();

//     var singleton_2 = createSingleton(object_2);
//     var instance_3 = singleton_2.getInstance();
//     var instance_4 = singleton_2.getInstance();
// // }