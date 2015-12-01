'use strict';


exports.name = 'NavCtrl';
exports.type = 'controller';
exports.factory = function($scope, $http, Auth) {
    $scope.testvar = 'Aap';
    $scope.auth = Auth;
    //$http.get('/api/admins').success(function (data) {
    //    $scope.sysAdmins = data.admins;
    //});
    return this;
};
