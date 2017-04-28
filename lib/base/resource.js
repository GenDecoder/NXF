// Constructor
function NxResource(router) {
    var me = this;
    me.router = router;
    me.init();
}
// Methods
NxResource.prototype.init = function() {};

NxResource.prototype.control = function(resources) {
    var me = this;
    
    Nx.each(resources, function iterator(resource) {
        var method = resource.method || "get";
        var fn = Nx.isFunction(resource.fn) ? resource.fn : function() {};
        var path = ("/" + (me.basePath || "") + "/" + resource.path).replace(/\/{2,}/g, "/");
        
        me.router[
            method.toLowerCase()
        ](
            path, fn
        );
    });
}
// Expose Class
module.exports = NxResource;