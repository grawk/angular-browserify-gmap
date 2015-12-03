'use strict';

exports.factory = function($scope, $state, Auth) {
    //nothing yet
    $scope.goto = function (where) {
        console.log('where is', where);
        if (where === 'sysadmin') {
            $state.transitionTo('home.admin');
        } else if (where === 'patients') {
            $state.transitionTo('home.patients');
        } else if (where === 'logout') {
            $state.transitionTo('login');
        }
    }
};
