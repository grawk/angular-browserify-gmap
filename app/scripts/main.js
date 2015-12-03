'use strict';

//app basics
var angular = require('angular');
var uiRoute = require('angular-ui-router');
var app = angular.module('jhApp', [uiRoute]);

//controllers
var loginCtrl = require('./controllers/LoginCtrl'),
    forgotCtrl = require('./controllers/ForgotCtrl'),
    navCtrl = require('./controllers/NavCtrl'),
    adminCtrl = require('./controllers/AdminCtrl'),
    patientCtrl = require('./controllers/PatientCtrl');

//combined views
var forgotView = {
        controller: forgotCtrl,
        templateUrl: 'views/ng/forgot.html'
    },
    navView = {
        controller: navCtrl,
        templateUrl: 'views/ng/nav.html'
    },
    adminView = {
        controller: adminCtrl,
        templateUrl: 'views/ng/admin.html'
    },
    patientView = {
        controller: patientCtrl,
        templateUrl: 'views/ng/patients.html'
    };

//injector
function inject(mod) {
    app[mod.type](mod.name, mod.factory);
    return mod.factory;
}

//auth service
var authSvc = require('./services/Auth');
inject(authSvc);

//patient service
var patientSvc = require('./services/PatientSvc');
inject(patientSvc);

//admin service
var adminSvc = require('./services/AdminSvc');
inject(adminSvc);

//example directive
var exampleDtv = require('./directives/ExampleDirective');
inject(exampleDtv);


app.config(['$locationProvider', '$stateProvider', function ($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    //application states
    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'views/ng/login.html',
            controller: loginCtrl
        })
        .state('forgot', forgotView)
        .state('home', {
            templateUrl: 'views/ng/home.html',
            abstract: true
        })
        .state('home.landing', {
            parent: 'home',
            url: '/home',
            views: {
                nav: navView
            }
        }).state('home.admins', {
            parent: 'home',
            url: '/home/admins',
            views: {
                nav: navView,
                main: adminView
            }
        }).state('home.patients', {
            parent: 'home',
            url: '/home/patients',
            views: {
                nav: navView,
                main: patientView
            }
        });

}]);

app.run();

