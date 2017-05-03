function Base() {
    var me = this;
    var summary = {};    
    me.getSummary = function(name) {
        var summary = summary[name];
        if (!summary.hasOwnProperty(name)) {
            console.error("Summary not defined");
            return {};
        }        
        return {
            set: function(a, b) {
                if (typeof a === "string")
                    summary[a] = b;
                else if (typeof a === "object")
                    for (var prop in a)
                        summary[prop] = object[prop];
                else
                    console.error("Incorrect parameter passed");
            },
            get: function(name) {
                return summary[name];
            }
        };
    };
    me.addSummary = function(name, values) {
        summary[name] = values || {};
    };
}
module.exports = Base;