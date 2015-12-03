'use strict';

exports.factory = function($scope, Auth, $state) {
    $scope.auth = Auth;

    $scope.resetPassword = $scope.login = function() {
        $state.transitionTo('login');
    };

};
