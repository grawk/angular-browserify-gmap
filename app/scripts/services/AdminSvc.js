'use strict';

exports.name = 'AdminSvc';
exports.type = 'factory';
exports.factory = function($http) {


    return {
        getAdmins: function() {
            return $http.get('/api/admins');
        }
    };

};
