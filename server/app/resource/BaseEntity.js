Nx.define('APP.resource.BaseEntity', {
    extend: 'Nx.Resource',

    test: 1,

    init: function () {
        console.log(2);
    },

    get: function(req, res) {
        res.json({success: true});
    },
    create: function(req, res) {
        res.json({success: true});
    },
    update: function(req, res) {
        res.json({success: true});
    },
    remove: function (req, res) {
        res.json({success: true});
    }
});