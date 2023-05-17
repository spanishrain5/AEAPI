module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("bookings", {
        booking_start: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: { 
                isDate: { msg: "Must be date" }
            },
        },
        booking_end: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: { 
                isDate: { msg: "Must be date" }
            },
        },
        num_of_people: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        validated: {
            type: DataTypes.BOOLEAN,
            default: false,
        }
    }, {
        timestamps: false
    });
    return Booking;
    };

/*
let bookings = [
    {
        id: 1, 
        accommodation_id: "1", 
        user_id: "1",
        booking_start: "May 1", 
        booking_end: "May 30",
        num_of_people: 2, 
        validated: true
    },
    {id: 2, accommodation_id: "2", user_id: "2",
     booking_start: "May 1", booking_end: "May 30",
     num_of_people: 2, validated: false}
    ];
    
    module.exports = students;
*/