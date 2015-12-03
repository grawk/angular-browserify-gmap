'use strict';

exports.factory = function($scope, Auth, $state) {
    $scope.testvar = 'Aap';
    $scope.auth = Auth;

    // Shortcut prefill of form, for demonstration purposes
    $scope.email = 'validEmail'+Math.round(Math.random() * 10000)+'@somedomain.org';
    $scope.password = 'somePassword';

    $scope.userSignup = function() {
        Auth.signup({
            email: $scope.email,
            password: $scope.password
        }).success(function(data) {
            console.log(data);
            if(data.error) {
                console.log('Error signing up');
                console.log(data.error); // Do something with the error message, or redirect
            } else {
                Auth.setLoggedIn(true);
                console.log('Signed up');
                console.log(data);
                // window.location.href = '/';
            }
        });
    };

    $scope.userLogin = function() {
        Auth.login({
            email: $scope.email,
            password: $scope.password
        }).success(function(data) {
            if(data.error) {
                console.log('Error logging in');
                console.log(data.error); // Do something with the error message, or redirect
            } else {
                Auth.setLoggedIn(true);
                console.log('Logged in');
                console.log(data);
                // window.location.href = '/';
            }
        });
    };

    $scope.login = function() {
        //console.log('login not implemented yet');
        //location.href='home';
        $state.transitionTo('home.landing');
    };
    $scope.forgotPassword = function() {
        $state.transitionTo('forgot');
    };

};
