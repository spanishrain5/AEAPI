const express = require('express');

const router = express.Router();

// import controller middleware
const accommodationsController = require("../controllers/accommodationsController");
const amenitiesController = require("../controllers/amenitiesController");
const authController = require("../controllers/authController");

router.route('/')
    .get( accommodationsController.findAll )
    .post( authController.verifyToken, accommodationsController.create );

router.route('/:id')
    .get( accommodationsController.findOne)
    .put( authController.verifyToken, accommodationsController.update )
    .patch( authController.verifyToken, accommodationsController.validate )
    .delete( authController.verifyToken, accommodationsController.delete );

router.route('/:id/amenities')
    .post( authController.verifyToken, amenitiesController.create )
    .get ( authController.verifyToken, amenitiesController.findAll )

router.route('/:id/amenities/:amenity_id')
    .get ( authController.verifyToken, amenitiesController.findOne )
    .delete ( authController.verifyToken, amenitiesController.delete )


/*
router.route('/:id/reviews')
    .get( accommodationsController.getReviews )
    .post( accommodationsController.createReview )

*/
    
router.all('*', (req, res) => {
    res.status(404).json({ message: 'accommodations: Invalid route' }); //send a predefined error message
})

//export this router
module.exports = router;