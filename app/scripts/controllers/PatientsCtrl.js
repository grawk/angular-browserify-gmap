'use strict';


exports.factory = function($scope, $http, Auth) {
    $scope.auth = Auth;

    //implement below as service?
    $http.get('/api/patients').success(function (data) {
        $scope.patients = data.patients;
    });

};
