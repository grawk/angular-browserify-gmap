'use strict';

//app basics
var angular = require('angular');
var uiRoute = require('angular-ui-router');
var app = angular.module('jhApp', [uiRoute]);

//controller modules
var loginCtrl = require('./controllers/LoginCtrl');
var navCtrl = require('./controllers/NavCtrl');
var adminCtrl = require('./controllers/AdminCtrl');

//injector
function inject(mod) {
        app[mod.type](mod.name, mod.factory);
        return mod.factory;
}

//auth service
var authSvc = require('./services/Auth');
inject(authSvc);

//example directive
var exampleDtv = require('./directives/ExampleDirective');
inject(exampleDtv);




app.config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'views/ng/login.html',
            controller: loginCtrl.factory
        })
        .state('home', {
            templateUrl: 'views/ng/home.html',
            abstract: true
        })
        .state('home.admin', {
            parent: 'home',
            url: '/admin',
            views: {
                'nav': {
                    controller: navCtrl.factory,
                    templateUrl: 'views/ng/nav.html'
                },
                'main': {
                    controller: adminCtrl.factory,
                    templateUrl: 'views/ng/admin.html'
                }
            }

        });

}]);

app.run();

