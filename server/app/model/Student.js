Nx.define('APP.model.Student', {
    extend: 'Nx.Model',
    
    expose: function() {
        var me = this;
        var ORM = DS.app.ORM;        
        return DS.app.DB.define(me.ENTITY, {
            id: {
                type: ORM.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: ORM.STRING(45),
            username: {
                type: ORM.STRING(20),
                validate: {
                    notEmpty: true
                }
            },
            password: {
                type: ORM.STRING(20),
                validate: {
                    notEmpty: true
                }
            },
            last_name: ORM.STRING(45)
        }, {
            tableName: "USER",
            setterMethods: {},
            getterMethods: {}
        });
    }   
});