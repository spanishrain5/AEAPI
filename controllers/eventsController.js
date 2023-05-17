const db = require("../models/index.js");
const Event = db.event;

const { ValidationError } = require('sequelize'); //necessary for model validations using sequelize

exports.create = (req, res) => {
    Event.create(req.body) 
        .then(data => {
            res.status(201).json({ success:true, msg:"New event created", URL:`/events/${data.id}`});
        })
        .catch(err => {
            if (err instanceof ValidationError) 
                res.status(400).json({ success:false, msg: err.errors.map(e => e.message) });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the entry."
                });
        });
};

/*
// import data
const movies = require("../models/eventsModel");

// exports custom request payload validation middleware
exports.bodyValidator = (req, res, next) => {
    
    //404 - not found, 400 - bad request
    const currentTime = new Date();
    let currentYear = currentTime.getFullYear();

    if (!req.body.name) {
        return res.status(400).json({ error: "Please provide the movie title" });
    } else if (!req.body.rating) {
        return res.status(400).json({ error: "Please provide the rating" });
    } else if (+req.body.rating < 1.0 || +req.body.rating > 10.0) {
        return res.status(400).json({ error: "Rating must be between 1.0 and 10.0" });
    } else if (!req.body.year) {
        return res.status(404).json({ error: "Please provide year of release" });
    } else if (+req.body.year > currentYear || +req.body.year < 1900) {
        return res.status(400).json({ error: "Release year must be between 1900 and " + currentYear + "" });
    }

    next();
};

// Display list of all movies
exports.findAll = (req, res) => {
    res.json(movies);
};


// Display one student
exports.findOne = (req, res) => {
    var requestedId = req.params.id;
    for (var i = 0; i < movies.length; i++) {
        if (movies[i].id == requestedId) {
            res.json(movies[i]);
        }
    }
    res.status(404).json({ error: "No such movie exists."});

};

// Get events
exports.findAll = (req, res) => {
    res.json(movies);
};

// Create new event
exports.create = (req, res) => {
    var lastEntryIndex = movies.length - 1;
    var newEntryId = movies[lastEntryIndex].id + 1;
    let newEntry = {id: newEntryId, name: req.body.name, year: req.body.year, rating: req.body.rating}
    if (movies.push(newEntry)) {
        res.status(200).json({ message: "Movie entry with ID " + newEntryId + " created" });
    }
    else res.status(500).json({ error: "Something went wrong" });
    
};

// Validate new event
exports.validate = (req, res) => {
    var requestedId = req.params.id;
    var updatedName = req.body.name;
    var updatedYear = req.body.year;
    var updatedRating = req.body.rating;
    
    for (var i = 0; i < movies.length; i++) {
        if (movies[i].id == requestedId) {
            if ((movies[i].name = updatedName) && (movies[i].year = updatedYear) && (movies[i].rating = updatedRating)) {
                res.status(200).json({ message: "Movie entry with ID " + requestedId + " changed" });
            }
            else res.status(500).json({ error: "Something went wrong"}); 
        }
    }
    res.status(404).json({ error: "No such movie exists."});
};

// Delete existing event
exports.delete = (req, res) => {
    var requestedId = req.params.id;
    for (var i = 0; i < movies.length; i++) {
        if (movies[i].id == requestedId) {
            if (movies.splice(i, 1)) {
                res.status(204).json({ message: "Movie entry with ID " + requestedId + " deleted" });
            }
            else res.status(500).json({ error: "Something went wrong"}); 
        }
    }
    res.status(404).json({ error: "No such movie exists."});
};

// Update existing event
exports.update = (req, res) => {
    var requestedId = req.params.id;
    var updatedName = req.body.name;
    var updatedYear = req.body.year;
    var updatedRating = req.body.rating;
    
    for (var i = 0; i < movies.length; i++) {
        if (movies[i].id == requestedId) {
            if ((movies[i].name = updatedName) && (movies[i].year = updatedYear) && (movies[i].rating = updatedRating)) {
                res.status(200).json({ message: "Movie entry with ID " + requestedId + " changed" });
            }
            else res.status(500).json({ error: "Something went wrong"}); 
        }
    }
    res.status(404).json({ error: "No such movie exists."});
};
*/