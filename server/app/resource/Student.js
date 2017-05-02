Nx.define('APP.resource.Student', {
    extend: 'APP.resource.BaseEntity',

    baseUrl: 'student',
    init: function () {
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
    }
});
