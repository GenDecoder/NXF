Nx.define('APP.resource.Student', {
    extend: 'APP.resource.BaseEntity',
    mixins: [
        "APP.mixin.Common"
    ],    
    baseUrl: 'student',
    construtor: function(models) {
        // the problem with this is that the intelligence is not gonna work
        // try;
    },
    init: function () {
        console.log('RESOURCE - STUDENT');
        var me = this;
        me.register([{
            type: 'get',
            fn: me.get,
            url: 'get'
        }, {
            type: 'post',
            fn: me.create,
            url: 'create'
        }, {
            type: 'post',
            fn: me.update,
            url: 'update'
        }, {
            type: 'post',
            fn: me.remove,
            url: 'remove'
        }]);
    },
    create: function(req, res) {
        res.json({success: 'Proper method'});
    }
});
