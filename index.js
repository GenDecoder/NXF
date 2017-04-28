var _ = require("underscore");
var mapper = require("./lib/util/mapper");
var dp = require("./lib/util/design-patterns");
var pathManager = require("./lib/util/path-manager");
var base = {        
    "Nx.Model": require("./lib/base/model"),
    "Nx.Resource": require("./lib/base/resource"),
    "Nx.Middleware": require("./lib/base/middleware"),
    "Nx.Application": require("./lib/base/application")
};
var bases = [
    "Nx.Model",
    "Nx.Resource",
    "Nx.Middleware",
    "Nx.Application"    
];
// Model: "",
// Resource: "", // posiblemente la instancia no se llame aca y tenga que recibir el router como parametro
// Middleware: "", // posiblemente la instancia no se llame aca y tenga que recibir el router como parametro
// Application: "", // basicamente es un singleton - cuyo contenido esta expuesto (quiza no debiese existir)

if (!global.Nx) {
    // global.Nx = {      
    //     define: mapper.setExposedSource, // CAN BE IMPROVED
    // };
    global.Nx = {}; // a singleton
    /**
     * NX will have the same methods that underscore has.
     */
    _.extend(Nx, _);
}

/**
 * Class constructor.
 * @param {Object} config 
 */
function Nox(config) {
    var me = this;
    var router = config.router;
    var name = config.name || "APP";
    var folder = process.cwd() + "/" + config.folder + "/";        
    var group = { // set to {} at the end
        mixin: [],
        singleton: [],        
        model: [],
        resource: [],
        middleware: [],
        application: []
    };
    var sourceMap = {}; // set to {} at the end
    var pathMap = pathManager.getPathMap(name, folder);
    try {
        /**
         * Validate Application Name (Should be unique because of the global variable used).
         */
        if (!global[name])
            global[name] = {};
        else
            throw new Error("Application with name: " + name + " is already in use.");
        /**
         * Add "Define" method to "Nx"
         */
        Nx.define = function(nxPath, scope) {
            if (Nx.contains(pathMap.js.nxPathList, nxPath)) 
                 mapper.addExposedMap(nxPath, scope);
            else
                 throw new Error(nxPath + " not found, review the file structure or look for typo errors in the Nx.define, there must exists consistency");
        };        
        /**
         * Trigger the "Nx.define" method for all Sources.
         */
        _.each(pathMap.js.absolutePathList, function iterator(absolutePath) {
            require(absolutePath);
        });
        /**
         * 
         */
        _.each(pathMap.js.nxPathList, function iterator(nxPath) {
            var object;            
            var parent;
            var road = [];
            var groupName;

            /**
             * Create roads
             */
            while(nxPath && !Nx.contains(bases, nxPath)) {
                road.push(nxPath);
                object = mapper.getExposedSource(nxPath);
                if (object)
                    nxPath = object.extend;
                else    
                    throw new Error(nxPath + " is not defined");
            }

            // GROUP NAME
            if (Nx.contains(bases, nxPath)) {
                parent = base[nxPath];
                groupName = nxPath.split('.')[1].toLowerCase();
            } else
                groupName = "mixin"; // ANOTHER proccess NEEDED

            // LA LOGICA SERA,  QUE TODOS LOS QUE NO SON PARTE DE LOS BASES, SERAN MIXINS
            // EN ESTE MISMO LUGAR, CREAR UN ARRAY DE MIXINS, FINALMENTE, SI LOS MIXINS EN GROUP[MIXIN]
            // SON LO MISMO QUE LOS MIXINS USADOS EN LOS RESOURCES TODO BIEN, PERO SU
            // UN MIXIN ES ENCONTRADO COMO TIPO RESOURCE, MIDDLEWARE, MODEL U OTRO, ENTONCES LANZAR Error
            // LOS MIXINS QUE NO SEAN USADOS COMO MIXINS, Y ESTE EN GROUP[MIXIN], SON UTILITARIOS, QUE PUEDEN SER ACCEDIDOS por
            // LA VARIABLE GLOBAL DIRECTAMENTE....

            // ESTABA PENSADO EN PASARLE LOS MODELS COMO PARAMETRO EN EL INIT....AUN QUEDA DEFINIR ESTO.

            // INHERITANCE PROCESS
            Nx.each(road, function iterator(nxPath) {
                // Send "router" only if first
                // Pass "router" only if Nx.Middleware or Nx.Resource
                object = mapper.getExposedSource(nxPath);
                if (!sourceMap[nxPath]) {
                    group[groupName].push(nxPath);
                    sourceMap[nxPath] = dp.createClass(object, parent, router)                                       
                }
            });
        });

        _.each(sourceMap, function iterator(sourceClass, nxPath) {
            mapper.setExposedSource(nxPath, sourceClass);
        });

           // Init per group
            // First:   Application (Singleton) // validate only one
            // Second:  Models
            // Thrid:   Middlewares
            // Fourth:  Resources

        group = {};
        sourceMap = {};
        delete Nx.define;
     
        //         // los que llegan aca a son mixin o son singleton
        //         // los mixin no puede ser singleton, y los que son singleton son expuestos
        //         console.log(nxPath + " can be a mixin or a util that must be exposed");
        //         // no debo exponer a los util asi por asi, deben tener la palabra singleton
        //         // APPLICATION SI ES SINGLETON, ES EL UNICO QUE QUEDA EXPUESTO, PERO . O NO?
        //     }
        //     // validation for just one application apply at the end of this process
            
        // }
    } catch(error) {
         console.log(error);
    }
    
    return router;
//     o que es usado como mixin no puede ser un singleton (no puede ser expuesto ya que no debe poder ser alterado)

// TODOS LOS: RESOURCES, MIDDLEWARES, MODELS CAN NOT BE EXPOSED, SO CAN NOT BE SINGLETONS, NEITHER USED AS MIXINS

// lo que se hace por detras es que se extienda de un mixin, pero un mixin no puede ser resource, middleware ni model, ni application
}
module.exports = Nox;