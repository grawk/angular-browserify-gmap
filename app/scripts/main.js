'use strict';

//app basics
var angular = require('angular');
window._ = require('lodash'); // this will add it to the global namespace
var nemLogging = require('angular-simple-logger');
var uiGmapgooglemaps = require('angular-google-maps');
//console.log(uiGmapgooglemaps.constructor);

//var requires = [
//    //nemLogging,
//    uiGmapgooglemaps
//];
var requires = ['nemLogging', 'uiGmapgoogle-maps'];
//var requires = [];
var app = angular.module('jhApp', requires)
    .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
        GoogleMapApi.configure({
            //key: 'AIzaSyCnpWpZtzb0PSHbgUn979WlnDFxSVh087I',
            // v: '3.20',
            libraries: 'weather,geometry,visualization'
        });
    }]);
app.service('GeocodeService', function ($q) {
    this.geocode = function (address) {
        console.log('GeocodeService.geocode called with', address);
        var deferred = $q.defer();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function (results, status) {
            console.log(results);
            if (status === google.maps.GeocoderStatus.OK) {
                deferred.resolve(results);
            } else {
                deferred.reject('Geocode was not successful for the following reason: ' + status);
            }
        });
        return deferred.promise;
    };

});
app.controller('mapController', ['$scope', 'uiGmapGoogleMapApi', 'GeocodeService', '$q', function ($scope, GoogleMapApi, GeocodeService, $q) {
    $scope.name = 'map controller';
    GoogleMapApi.then(function () {


        var places = [{
            addr: '340 Lemmon Way Hanford CA 93230',
            label: 'home',
            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
        }, {
            addr: '740 Laura Lane Hanford CA 93230',
            label: 'park home',
            icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }, {
            addr: '2265 Lemonwood Ct Hanford CA 93230',
            label: 'joni home',
            icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        }];
        var geocodePromises = [];
        places.forEach(function (place) {
            var prom = GeocodeService.geocode(place.addr);
            geocodePromises.push(prom);
            prom.then(function (result) {
                place.geocode = result;
            });
        });
        $scope.map = {
            control: {},
            center: {
                latitude: 44,
                longitude: 2
            },
            zoom: 12
        };

        $q.all(geocodePromises).then(function (geocodeResults) {
            var center = {
                lat: places[0].geocode[0].geometry.location.lat(),
                lng: places[0].geocode[0].geometry.location.lng()
            };
            console.log('map center', center);
            $scope.map = {
                control: {},
                center: {
                    latitude: center.lat,
                    longitude: center.lng
                },
                zoom: 12,
                markers: places.map(function (place, index) {
                    return {
                        id: index,
                        latitude: place.geocode[0].geometry.location.lat(),
                        longitude: place.geocode[0].geometry.location.lng(),
                        showWindow: false,
                        options: {
                            labelContent: place.label,
                            labelAnchor: '22 0',
                            labelClass: 'marker-labels',
                            windowContent: place.addr,
                            icon: place.icon
                        }
                    }
                })
            };
            window.gctrl = $scope.map.control;

        });


    });
    var onMarkerClicked = function (marker) {
        marker.showWindow = true;
        $scope.$apply();
    };
}]);


//.controller('mapController', ['$scope', function ($scope) {
//        $scope.name = 'map controller';
//
//
//    }]);

//angular.module('jhApp').factory('_', ['$window', function ($window) {
//    return $window._; // assumes underscore has already been loaded on the page
//}]);

app.run();
