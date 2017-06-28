var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;
var Place = require('../models/place');
var Day = require('../models/day');


router.get('/api/restaurants', function(req, res, next) {
  Restaurant.findAll({
    include: [Place]
  }).then(function(restaurants) {
    res.json(restaurants);
  })

});

router.get('/api/hotels', function(req, res, next) {
  Hotel.findAll({
    include: [Place]
  }).then(function(hotels) {
    res.json(hotels);
  })

});

router.get('/api/activities', function(req, res, next) {
  Activity.findAll({
    include: [Place]
  }).then(function(activities) {
    res.json(activities);
  })

});




router.get('/api/days', (req, res, next) => {
  Day.findAll({
    include:[Day]
  }).then(console.log);
})

router.get('/', function(req, res, next) {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread(function(dbHotels, dbRestaurants, dbActivities) {
    res.render('index', {
      templateHotels: dbHotels,
      templateRestaurants: dbRestaurants,
      templateActivities: dbActivities
    });
  })
  .catch(next);
});

module.exports = router;
