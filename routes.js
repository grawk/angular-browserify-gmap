'use strict';

module.exports = function (router) {
    router.get('/api/admins', require('./controller/admin'));
    router.get('*', require('./controller/index'));
}