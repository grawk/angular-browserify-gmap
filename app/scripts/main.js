'use strict';

//app basics
var angular = require('angular');
var uiRoute = require('angular-ui-router');
var app = angular.module('jhApp', [uiRoute]);

//controller modules
var loginCtrl = require('./controllers/LoginCtrl');
var forgotCtrl = require('./controllers/ForgotCtrl');
var navCtrl = require('./controllers/NavCtrl');
var adminCtrl = require('./controllers/AdminCtrl');
var patientsCtrl = require('./controllers/PatientsCtrl');

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


app.config(['$locationProvider', '$stateProvider', function ($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'views/ng/login.html',
            controller: loginCtrl.factory
        })
        .state('forgot', {
            templateUrl: 'views/ng/forgot.html',
            controller: forgotCtrl.factory
        })
        .state('home', {
            templateUrl: 'views/ng/home.html',
            abstract: true
        })
        .state('home.landing', {
            parent: 'home',
            url: '/home',
            views: {
                nav: {
                    controller: navCtrl.factory,
                    templateUrl: 'views/ng/nav.html'
                }
            }
        }).state('home.admin', {
            parent: 'home',
            url: '/home/admin',
            views: {
                nav: {
                    controller: navCtrl.factory,
                    templateUrl: 'views/ng/nav.html'
                },
                main: {
                    controller: adminCtrl.factory,
                    templateUrl: 'views/ng/admins.html'
                }
            }
        }).state('home.patients', {
            parent: 'home',
            url: '/home/patients',
            views: {
                nav: {
                    controller: navCtrl.factory,
                    templateUrl: 'views/ng/nav.html'
                },
                main: {
                    controller: patientsCtrl.factory,
                    templateUrl: 'views/ng/patients.html'
                }
            }
        });

}]);

app.run();

