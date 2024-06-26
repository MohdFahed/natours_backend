const express = require('express');
const tourController = require('./../controllers/tourController')

const route = express.Router();

/** params middleware it will execute when we get id params only */
// route.param('id',tourController.checkID)
/**End */

//check body middleware 

route.route('/top-5-chep').get(tourController.aliasTopTours,tourController.getAllTours)
route.route('/').get(tourController.getAllTours).post(tourController.createTour)
route.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour)

module.exports = route ;