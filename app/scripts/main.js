'use strict';

//app basics
var angular = require('angular');
//window._ = require('lodash'); // this will add it to the global namespace
//var nemLogging = require('angular-simple-logger');
//var uiGmapgooglemaps = require('angular-google-maps');


//var requires = [
//    nemLogging,
//    uiGmapgooglemaps
//];
var requires = ['uiGmapgoogle-maps'];
//var requires = [];
var app = angular.module('jhApp', requires)
    .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
        GoogleMapApi.configure({
            //key: 'AIzaSyCnpWpZtzb0PSHbgUn979WlnDFxSVh087I',
            // v: '3.20',
            libraries: 'weather,geometry,visualization'
        });
    }])
    .controller('mapController', ['$scope', 'uiGmapGoogleMapApi', function ($scope, GoogleMapApi) {
        $scope.name = 'map controller';
        //console.log(GoogleMapApi, $scope);
        GoogleMapApi.then(function(maps) {
            console.log('maps', maps);
            //$scope.map.control.getGMap().setZoom(11);
            //$scope.googleVersion = maps.version;
            //maps.visualRefresh = true;
            $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };


        });
        //$scope.googleVersion = maps.version;
        //maps.visualRefresh = true;
        //uiGmapIsReady.promise(1).then(function(instances) {
        //    instances.forEach(function(inst) {
        //        var map = inst.map;
        //        var uuid = map.uiGmap_id;
        //        var mapInstanceNumber = inst.instance; // Starts at 1.
        //        console.log(map, uuid, mapInstanceNumber);
        //    });
        //});
    }]);
//console.log(app);
//
//app.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
//    console.log('chop suey fooey');
//    GoogleMapApi.configure({
//    //key: 'AIzaSyCnpWpZtzb0PSHbgUn979WlnDFxSVh087I',
//        // v: '3.20',
//        libraries: 'weather,geometry,visualization'
//    });
//}]);
//
//angular.module('jhApp').config(function (uiGmapGoogleMapApiProvider) {
//    uiGmapGoogleMapApiProvider.configure({
//        //    key: 'your api key',
//        v: '3.20', //defaults to latest 3.X anyhow
//        libraries: 'weather,geometry,visualization,places'
//    });
//});

//angular.module('jhApp').factory('_', ['$window', function ($window) {
//    return $window._; // assumes underscore has already been loaded on the page
//}]);

app.run();
