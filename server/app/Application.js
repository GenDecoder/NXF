Nx.define('APP.Application', {
    extend: 'Nx.Application',

    // global: {
    //     fs: require('fs'),
    //     cy: require('bcryptjs'),
    //     q: require('q').Promise,
    //     csv: require('fast-csv'),
    //     moment: require('moment'),
    //     jwt: require('jwt-simple'),
    //     _CONFIG: {
    //         SECRET_TOKEN: 'THIS_IS_MY_SECRET_TOKEN_5500',
    //         DB: {
    //             name: 'inefable',
    //             username: 'mario',
    //             password: 'mario'
    //         }
    //     }
    // },

    _CONFIG: {
        SECRET_TOKEN: 'THIS_IS_MY_SECRET_TOKEN_5500',
        DB: {
            name: 'inefable',
            username: 'mario',
            password: 'mario'
        }
    },

    init: function() {
        var me = this;
        // me.orm = require('sequelize');
        // me.instance = new me.orm(me._CONFIG.DB.name, me._CONFIG.DB.username, me._CONFIG.DB.password, {
        //     dialect: 'mysql',
        //     host: 'localhost'
        // });
        // LOS DEMAS NO DEBEN EXTENDER DE APPLICATION, PERO SI PUEDEN ACCEDER VIA: APP.Application.orm, APP.Application.instance
    },

    initDB: function() {
        var me = this;
        // var orm = require('sequelize');
        // var instance = new orm(me._CONFIG.DB.name, me._CONFIG.DB.username, me._CONFIG.DB.password, {
        //     dialect: 'mysql',
        //     host: 'localhost'
        // });

        // return [orm, instance];
    }
});