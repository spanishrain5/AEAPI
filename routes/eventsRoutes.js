const express = require('express');

const router = express.Router();

// import controller middleware
const eventsController = require("../controllers/eventsController");
router.route('/')
    //.get( eventsController.findAll )
    .post( eventsController.create );

router.route('/:id')
    //.get( eventsController.findOne)
    //.put( eventsController.bodyValidator, eventsController.update )
    //.patch( eventsController.validate )
    //.delete( eventsController.delete );

/*
router.route('/:id/interested-users')
    .get( eventsController.getInterestedUsers )
    .post( eventsController.manifestInterest )
    .delete( eventsController.deleteInterest )
*/

router.all('*', (req, res) => {
    res.status(404).json({ message: 'events: Invalid route' }); //send a predefined error message
})

//export this router
module.exports = router;