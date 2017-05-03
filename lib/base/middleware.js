function NxMiddleware(router) {
    var me = this;
    me.router = router;
    me.register = function(middlewares) {
        var me = this;        
        Nx.each(middlewares, function iterator(middleware) {
            // var method = resource.method || "get";
            // var fn = Nx.isFunction(resource.fn) ? resource.fn : function() {};
            // var path = ("/" + (me.basePath || "") + "/" + resource.path).replace(/\/{2,}/g, "/");
            me.router.use(function (req, res, next) {
                var findFn = function (route) {
                    route = route.trim();
                    var inSensitive = Nx.indexOf(route, '*') > - 1;
                    route = route.replace(/^\**/, '').replace(/(:[^\/]*)/g, '.\\S*');
                    return new RegExp(route + (inSensitive ? '' : '$')).test((req.url).split('?')[0]);
                };
                if (
                    (Nx.has(cd, at) && Nx.find(Nx.isString(cd[at]) ? [cd[at]] : cd[at], findFn)) ||
                    (Nx.has(cd, et) && !Nx.find(Nx.isString(cd[et]) ? [cd[et]] : cd[et], findFn)) ||
                    (Nx.isString(cd) && (cd[0] === '-' && !findFn(cd.split('-')[1]))) ||
                    (Nx.isString(cd) && (Nx.isEqual(cd, '*') || findFn(cd)))
                )
                    wall(req, res, next);
                else
                    next();
            });
        });
    };
}
module.exports = NxMiddleware;

// var initMiddleWare = function () {
//     path = folder + 'middleware';
//     var middleware = require(path);
//     scopeManager(middleware);

//     _.each(app['middleware'], function (cd, wallMethod) {
//         if(!_.isEqual(_.first(wallMethod), '#')) return;
//         var at = 'applyTo';
//         var et = 'exceptTo';
//         var wall = _.bind(middleware[wallMethod.substr(1)], middleware);

//         api.use(function (req, res, next) {
//             var findFn = function (route) {
//                 route = route.trim();
//                 var inSensitive = _.indexOf(route, '*') > - 1;
//                 route = route.replace(/^\**/, '').replace(/(:[^\/]*)/g, '.\\S*');
//                 return new RegExp(route + (inSensitive ? '' : '$')).test((req.url).split('?')[0]);
//             };
//             if (
//                 (_.has(cd, at) && _.find(_.isString(cd[at]) ? [cd[at]] : cd[at], findFn)) ||
//                 (_.has(cd, et) && !_.find(_.isString(cd[et]) ? [cd[et]] : cd[et], findFn)) ||
//                 (_.isString(cd) && (cd[0] === '-' && !findFn(cd.split('-')[1]))) ||
//                 (_.isString(cd) && (_.isEqual(cd, '*') || findFn(cd)))
//             )
//                 wall(req, res, next);
//             else
//                 next();
//         });
//     });
// };