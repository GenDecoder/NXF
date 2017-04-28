var _ = require("underscore");
var getTempValue = function(nxAppName) {
    var main;    
    var temp;
    
    main = global[nxAppName];
    temp = main;
    main = temp;

    return temp;
};
/**
 * 
 */
function Mapper() {}
/**
 * 
 */
Mapper.prototype.addExposedMap = function(nxPath, value) {
    var me = this;
    var nodes = nxPath.split(".");
    var temp = getTempValue(nodes.shift());

    value = value || {};

    _.each(nodes, function (ref) {
        if (!temp[ref])
            temp = temp[ref] = value;
        else 
            temp = temp[ref];
    });
};
Mapper.prototype.setExposedSource = function(nxPath, value) { // Add error messages
    var me = this;
    var nodes = nxPath.split(".");
    var temp = getTempValue(nodes.shift());
    
    _.each(nodes, function (ref, index, list) {
        if (index === list.length - 1) {
            if (temp[ref])
                temp = temp[ref] = value;
            else 
                new Error("File " + nxPath + " was not found.");
        } else
            temp = temp[ref];
    });
};
Mapper.prototype.getExposedSource = function(nxPath) {
    var me = this;
    var nodes = nxPath.split(".");
    var temp = getTempValue(nodes.shift());
    
    _.each(nodes, function (ref) {
        temp = temp[ref];
    });

    return temp;
};

module.exports = new Mapper();