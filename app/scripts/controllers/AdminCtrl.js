'use strict';


module.exports = function($scope, $http, Auth, AdminSvc) {
    $scope.auth = Auth;

    AdminSvc.getAdmins().success(function (data) {
        $scope.sysAdmins = data.admins;
    });

};
