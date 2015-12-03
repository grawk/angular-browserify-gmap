'use strict';


exports.factory = function($scope, $http, Auth, PatientSvc) {
    $scope.auth = Auth;

    PatientSvc.getPatients().success(function (data) {
        $scope.patients = data.patients;
    });

};
