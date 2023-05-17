const db = require("../models/index.js");
const Accommodation = db.accommodation;

const { ValidationError } = require('sequelize'); //necessary for model validations using sequelize

exports.create = (req, res) => {
    
    if (req.loggedUserType !== "facilitator") {
        return res.status(403).json({
            success: false, msg: "You do not have permission to access this resource"
        });
    }
    console.log(req.loggedUserId)
    Accommodation.create(req.body) 
        .then(data => {
            //console.log(data)
            data.facilitator_id = req.loggedUserId;
            data.save()
            res.status(201).json({ success:true, msg:"Accommodation offer successfully created", URL:`/accommodations/${data.id}`});
        })
        .catch(err => {
            if (err instanceof ValidationError) 
                res.status(400).json({ success:false, msg: err.errors.map(e => e.message) });
            else
                res.status(500).json({
                    message: err.message || "Something went wrong. Please try again later"
                });
        });
};

exports.findAll = async (req, res) => {
    try {
        // do not expose users' sensitive data
        let accommodations = await Accommodation.findAll({ 
            attributes: ['id', 'facilitator_id', 'validated', 'title', 'area', 'adress', 'room_type', 'number_of_beds', 'bed_type', 
            'max_guests', 'available_from', 'minimum_stay', 'rating', 'price'] 
        })
    
        res.status(200).json({ success: true, accommodations: accommodations });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Something went wrong. Please try again later."
        });
    };
};

exports.findOne = async (req, res) => {
    try {
        //0 do not expose users' sensitive data
        let accommodations = await Accommodation.findAll({ 
            where: {
                id: req.params.id  
            },
            attributes: ['id', 'facilitator_id', 'validated', 'title', 'area', 'adress', 'room_type', 'number_of_beds', 'bed_type', 
            'max_guests', 'available_from', 'minimum_stay', 'rating', 'price'] 
        })
        if (accommodations == '') {
            res.status(404).json({
                success: false, msg: "Accommodation not found"
            })
        } else {
           res.status(200).json({ success: true, accommodations: accommodations }); 
        }
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Something went wrong. Please try again later."
        });
    };
};

exports.delete = async (req, res) => {
    try {

        //console.log(req.loggedUserType);

        var listing = await Accommodation.findOne({ where: { id: req.params.id } });

        if (!listing) {
            res.status(404).json({
                success: false, msg: "Accommodation not found"
            })
        } else if (req.loggedUserType !== "admin" && (req.loggedUserType != "facilitator" || req.loggedUserId != listing.facilitator_id)) {
            return res.status(403).json({
                success: false, msg: "You do not have permission to access this resource (delete)"
            });   
        } else {
            listing.destroy();
            res.status(200).json({ success: true, msg: "Accommodation successfully removed" });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Something went wrong. Please try again later"
        });
    };
}

exports.validate = async (req, res) => {
    try {
        if (req.loggedUserType !== "admin") {
            return res.status(403).json({
                success: false, msg: "You do not have permission to access this resource"
            });
        }
        // do not expose users' sensitive data
        
        var listing = await Accommodation.findOne({ where: { id: req.params.id } });

        if (!listing) {
            res.status(404).json({
                success: false, msg: "User not found"
            })
        } else {
            listing.update ({
                validated: true
            });
            res.status(200).json({ success: true, msg: "Accommodation validated successfully." }); 
        }
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Something went wrong. Please try again later"
        });
    };
}

exports.update = async (req, res) => {
    try {
        var listing = await Accommodation.findOne({ where: { id: req.params.id } });

        if (!listing) {
            res.status(404).json({
                success: false, msg: "Accommodation not found"
            })
        } else if (req.loggedUserType !== "admin" && (req.loggedUserType != "facilitator" || req.loggedUserId != listing.facilitator_id)) {
            return res.status(403).json({
                success: false, msg: "You do not have permission to access this resource"
            });   
        } else if (!req.body) {
            return res.status(400).json({
                success: false, msg: "Please edit at least one parameter"
            });
        } else {
            listing.update (req.body);
            res.status(200).json({ success: true, msg: "Accommodation successfully updated" });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Something went wrong. Please try again later"
        });
    };
}

/*
// import data
const movies = require("../models/accommodationsModel");

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

// Get accommodation offers
exports.findAll = (req, res) => {
    res.json(movies);
};

// Create new accommodation offer
exports.create = (req, res) => {
    var lastEntryIndex = movies.length - 1;
    var newEntryId = movies[lastEntryIndex].id + 1;
    let newEntry = {id: newEntryId, name: req.body.name, year: req.body.year, rating: req.body.rating}
    if (movies.push(newEntry)) {
        res.status(200).json({ message: "Movie entry with ID " + newEntryId + " created" });
    }
    else res.status(500).json({ error: "Something went wrong" });
    
};

// Validate new accommodation offer
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

// Delete existing accommodation offer
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

// Update existing accommodation offer
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