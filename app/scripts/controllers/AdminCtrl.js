'use strict';


exports.factory = function($scope, $http, Auth, AdminSvc) {
    $scope.auth = Auth;

    AdminSvc.getAdmins().success(function (data) {
        $scope.sysAdmins = data.admins;
    });

};
