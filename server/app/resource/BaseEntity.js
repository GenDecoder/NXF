Nx.define('APP.resource.BaseEntity', {
    extend: 'Nx.Resource',

    test: 1,

    init: function () {
        console.log(2);
    }
});