Nx.define('APP.resource.Student', {
    extend: 'APP.resource.BaseEntity',

    base: '/student',
    init: function () {
        var me = this;
        
        me.control({
            '/get': {
                type: 'get',
                method: me.get() // fn
            },
            '/create': {
                type: 'post',
                method: me.create
            },
            '/update': {
                type: 'post',
                method: me.update
            },
            '/remove': {
                type: 'post',
                method: me.remove
            }
        });
    },

    get: function(req, res) {
        console.log('GET METHOD CORRECTLY REGISTERED');
    },

    create: function () {
        console.log('Create Student');
    }
});
