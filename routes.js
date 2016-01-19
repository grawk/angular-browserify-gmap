'use strict';

module.exports = function (router) {
    //router.get('/api/admins', require('./controller/admins'));
    //router.get('/api/patients', require('./controller/patients'));
    router.get('*', require('./controller/index'));
};