const db = require("../models/index.js");
const Review = db.review;

const { ValidationError } = require('sequelize'); //necessary for model validations using sequelize

exports.create = (req, res) => {
    Review.create(req.body) 
        .then(data => {
            res.status(201).json({ success:true, msg:"New review created", URL:`{accommodation-id}/reviews/${data.id}`});
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