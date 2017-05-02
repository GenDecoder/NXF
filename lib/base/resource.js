function NxResource(router) {
    var me = this;    
    me.router = router;
    me.register = function(resources) {
        var me = this;
        Nx.each(resources, function iterator(resource) {
            var type = resource.type || "get";
            var fn = Nx.isFunction(resource.fn) ? resource.fn : function() {};
            var url = ("/" + (me.baseUrl || "") + "/" + resource.url).replace(/\/{2,}/g, "/");
            me.router[type.toLowerCase()](url, fn);
        });
    };
}
module.exports = NxResource;