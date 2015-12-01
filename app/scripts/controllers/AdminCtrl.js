'use strict';


exports.name = 'AdminCtrl';
exports.type = 'controller';
exports.factory = function($scope, $http, Auth) {
    $scope.auth = Auth;
    $http.get('/api/admins').success(function (data) {
        $scope.sysAdmins = data.admins;
    });

};
