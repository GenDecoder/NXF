var _ = require("underscore");
// Constructor
function NxMiddleware() {

}
// Methods
NxMiddleware.prototype.control = function(middlewares) {
    var me = this;
    
    _.each(middlewares, function iterator(middleware) {
        // var method = resource.method || "get";
        // var fn = _.isFunction(resource.fn) ? resource.fn : function() {};
        // var path = ("/" + (me.basePath || "") + "/" + resource.path).replace(/\/{2,}/g, "/");
        
        me.router[
            method.toLowerCase()
        ](
            path, fn
        );

        me.router.use(function (req, res, next) {
            var findFn = function (route) {
                route = route.trim();
                var inSensitive = _.indexOf(route, '*') > - 1;
                route = route.replace(/^\**/, '').replace(/(:[^\/]*)/g, '.\\S*');
                return new RegExp(route + (inSensitive ? '' : '$')).test((req.url).split('?')[0]);
            };
            if (
                (_.has(cd, at) && _.find(_.isString(cd[at]) ? [cd[at]] : cd[at], findFn)) ||
                (_.has(cd, et) && !_.find(_.isString(cd[et]) ? [cd[et]] : cd[et], findFn)) ||
                (_.isString(cd) && (cd[0] === '-' && !findFn(cd.split('-')[1]))) ||
                (_.isString(cd) && (_.isEqual(cd, '*') || findFn(cd)))
            )
                wall(req, res, next);
            else
                next();
        });

    });
};
// Expose Class
module.exports = NxMiddleware;