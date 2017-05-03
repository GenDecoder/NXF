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
    expose: function() {
        var me = this;
        var ORM = require("sequelize");
        return {
            ORM: ORM,
            DB: new ORM(me.DB.name, me.DB.username, me.DB.password, {
                dialect: "mysql",
                host: "localhost"
            })
        };        
    }
});
// THE EXPOSE, EXPOSES WHAT IS RETURNED
    // FOR MODELS AND APPLICATION THE EXPOSE IS CALLED AUTOMATICALLY.