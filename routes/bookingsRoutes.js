const express = require('express');

const router = express.Router();

// import controller middleware
const bookingsController = require("../controllers/bookingsController");
router.route('/')
    //.get( bookingsController.findAll )
    .post( bookingsController.create );

router.route('/:id')
    //.get( bookingsController.findOne)
    //.put( bookingsController.bodyValidator )
    //.patch( bookingsController.validate )
    //.delete( bookingsController.delete );

router.all('*', (req, res) => {
    res.status(404).json({ message: 'bookings: Invalid route' }); //send a predefined error message
})

//export this router
module.exports = router;