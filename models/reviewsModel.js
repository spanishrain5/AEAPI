module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("reviews", {
        /*
        facilitator_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            default: 0,
        },
        */
        rating: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        review_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false
    });
    return Review;
    };