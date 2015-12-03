'use strict';


module.exports = function($scope, $http, Auth, PatientSvc) {
    $scope.auth = Auth;

    PatientSvc.getPatients().success(function (data) {
        $scope.patients = data.patients;
    });

};
