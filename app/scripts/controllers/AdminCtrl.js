'use strict';


exports.factory = function($scope, $http, Auth) {
    $scope.auth = Auth;

    //implement below as service?
    $http.get('/api/admins').success(function (data) {
        $scope.sysAdmins = data.admins;
    });

};
