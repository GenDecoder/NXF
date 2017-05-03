Nx.define('APP.Application', {
    extend: 'Nx.Application',    
    SECRET_TOKEN: 'THIS_IS_MY_SECRET_TOKEN_5500',    
    DB: {
        name: 'inefable',
        username: 'mario',
        password: 'mario'
    },
    /**
     * This init is the first to be called.
     */
    init: function() {
        var me = this;        
        me.ORM = require("sequelize");
        me.DB =  new me.ORM(me.DB.name, me.DB.username, me.DB.password, {
            dialect: "mysql",
            host: "localhost"
        });
    }
});