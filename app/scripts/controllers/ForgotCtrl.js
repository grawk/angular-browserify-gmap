'use strict';

module.exports = function($scope, Auth, $state) {
    $scope.auth = Auth;

    $scope.resetPassword = $scope.login = function() {
        $state.transitionTo('login');
    };

};
