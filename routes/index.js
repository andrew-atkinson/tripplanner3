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
  }).catch(next);

});

router.get('/api/hotels', function(req, res, next) {
  Hotel.findAll({
    include: [Place]
  }).then(function(hotels) {
    res.json(hotels);
  }).catch(next);

});

router.get('/api/activities', function(req, res, next) {
  Activity.findAll({
    include: [Place]
  }).then(function(activities) {
    res.json(activities);
  }).catch(next);

});


router.get('/api/days', function(req, res, next){
  Day.findAll({
    include: [Hotel,Restaurant,Activity]
  }).then(function(itinerary){
    res.json(itinerary)
  }).catch(next);

});

router.get('/api/days/:id', function(req, res, next){
  Day.findOne({
    where : {number : req.params.id },
    include: [Hotel,Restaurant,Activity]
  }).then(function(itinerary){
    res.json(itinerary)
  }).catch(next);
});

router.delete('/api/days/:id', function(req, res, next){
  Day.destroy({
    where : {number : req.params.id },
    include: [Hotel,Restaurant,Activity]
  }).then(function(){
    res.send("succesfully deleted!");
  }).catch(next);
});

// router.post('/api/days/:id', (req, res, next) => {
//   Day.findorCreate({
//     where: {number : req.params.id}
//   }).spread(function( itinerary, dayCreated){
//     res

//   })

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
