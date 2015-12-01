'use strict';


exports.name = 'HomeCtrl';
exports.type = 'controller';
exports.factory = function($state) {
    $state.transitionTo('home.admin');
};
