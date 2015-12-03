'use strict';

exports.name = 'PatientSvc';
exports.type = 'factory';
exports.factory = function($http) {


    return {
        getPatients: function() {
            return $http.get('/api/patients');
        }
    };

};
