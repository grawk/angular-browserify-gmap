'use strict';

module.exports = function (req, res) {
    res.render('index', {title: {foo: 'bar'}});
};