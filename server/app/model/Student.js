Nx.define('APP.model.Student', {
    extend: 'Nx.Model',
    schema: function(orm, instance) {
        var me = this;

        return instance.define(me.ENTITY, {
            id: {
                type: orm.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: orm.STRING(45),
            username: {
                type: orm.STRING(20),
                validate: {
                    notEmpty: true
                }
            },
            password: {
                type: orm.STRING(20),
                validate: {
                    notEmpty: true
                }
            },
            last_name: orm.STRING(45)
        }, {
            tableName: this.ENTITY,
            setterMethods: {

            },
            getterMethods: {

            }
        });
    }
});