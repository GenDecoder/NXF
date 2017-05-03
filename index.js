var _ = require("underscore");
var mapper = require("./lib/util/mapper");
var dp = require("./lib/util/design-patterns");
var pathManager = require("./lib/util/path-manager");
var bases = {
    "Nx.Model": require("./lib/base/model"),
    "Nx.Resource": require("./lib/base/resource"),
    "Nx.Middleware": require("./lib/base/middleware"),
    "Nx.Application": require("./lib/base/application")
};
if (!global.Nx) {    
    global.Nx = {}; // a singleton?
    // NX will have the same methods that underscore has.
    _.extend(Nx, _);
}
// NX constructor.
function Nox(config) {
    var me = this;
    var group = [];    
    var router = config.router;
    var name = config.name || "APP";
    var folder = config.folder + "/";
    var pathMap = pathManager.getPathMap(name, folder);
    var mixinUp = function(source) {
        _.each(source.mixins, function iterator(mixinNxPath) {            
            var mixinsInstance;
            var mixinSource = mapper.getExposedSource(mixinNxPath);
            if (!_.isFunction(mixinSource)) {
                bootUp(mixinNxPath);
                mixinSource = mapper.getExposedSource(mixinNxPath);
            }
            mixinsInstance = new mixinSource();
            for (var prop in mixinsInstance)
                if (!source.hasOwnProperty(prop))
                    source[prop] = mixinsInstance[prop];            
        });
    };
    var bootUp = function (nxPath) {        
        var instance;
        var parentNxPath;
        var newConstructor;
        var source = mapper.getExposedSource(nxPath);
        if (!_.isFunction(source)) {
            parentNxPath = source.extend;
            parent = parentNxPath ? bases.hasOwnProperty(parentNxPath) ? bases[parentNxPath] : mapper.getExposedSource(parentNxPath) : null;
            // Apply properties to source.
            mixinUp(source);           
            // Inheritance proccess.
            newConstructor = dp.iacc(source, parent, router); // validar esto de cuando enviar el router
            // Expose source (Constructor).
            mapper.setExposedSource(nxPath, newConstructor);
            // Create and initialize instance.
            if (!_.isEqual(this.toString(), "open")) {
                instance = new newConstructor();
                _.isFunction(instance.init) && instance.init();
            }
            console.log(nxPath);
        }
    };
    try {
        // Validate Application Name (Should be unique because of the global variable used).
        if (!global[name])
            global[name] = {};
        else
            throw new Error("Application with name: " + name + " is already in use.");
        // Adding "Define" method to "Nx".
        Nx.define = function(nxPath, scope) {
            if (Nx.contains(pathMap.js.nxPathList, nxPath)) {
                var nxClass = 
                 mapper.addExposedSource(nxPath, scope);
            } else
                 throw new Error(nxPath + " not found, review the file structure or look for typo errors in the Nx.define, there must exists consistency");
        };        
        // Trigger the "Nx.define" method for all Sources.
        // _.each(pathMap.js.absolutePathList, function iterator(absolutePath) {
        //     require(absolutePath);
        // });
        _.each(pathMap.js.absolutePathList, require);
        // Create roads and group them.
        _.each(pathMap.js.nxPathList, function iterator(nxPath) {           
            var groupName;
            var road = [];
            while(nxPath && !bases.hasOwnProperty(nxPath)) {
                var source = mapper.getExposedSource(nxPath);
                // HERE I CAN SEPARATE ALL MIXINS
                if (!_.contains(road, nxPath))
                    road.push(nxPath);
                else
                    throw new Error("Infinite loop created: Review: " + road.join(', '));
                nxPath = source.extend;
            }
            groupName = nxPath || "open";
            if (!group[groupName])
                group[groupName] = [];
            group[groupName].push(road.reverse());
        });
        function loopMatrix(road) {
            _.each(road, bootUp, this);
        }
        // Boot Up Proccess.
        _.each(group["open"], loopMatrix, "open");
        // only those that are singleton are open
        _.each(group["Nx.Application"], loopMatrix, "Nx.Application"); // the group must have only one array
        _.each(group["Nx.Model"], loopMatrix, "Nx.Model");
        _.each(group["Nx.Middleware"], loopMatrix, "Nx.Middleware");
        _.each(group["Nx.Resource"], loopMatrix, "Nx.Resource");
        delete Nx.define;        
    } catch(error) {
         console.log(error);
    }    
    return router;
}
module.exports = Nox;