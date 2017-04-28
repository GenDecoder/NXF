Nx.define('APP.resource.Student', {
    extend: 'APP.resource.BaseEntity',

    base: '/student',

    router: {
        '/create': 'POST#create',
        '/update': 'POST#update',
        '/remove': 'POST#remove'
    },

    init: function () {
        var me = this;
        
        // me.control({
        //     '/create': {
        //         type: 'post',
        //         method: me.create
        //     },
        //     '/update': {
        //         type: 'post',
        //         method: me.update
        //     },
        //     '/remove': {
        //         type: 'post',
        //         method: me.remove
        //     }
        // });
    },

    create: function () {
        console.log('Create Student');
    }
});
