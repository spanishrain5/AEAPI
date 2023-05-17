module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("students", {
        email: {
            type: DataTypes.STRING,
            unique: {
                arg: true, 
                msg: "Account with that email already exists"  
            },
            allowNull: false,
            validate: { 
                notNull: { msg: "Please provide email" },
                isEmail: { msg: "Invalid email" }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true, //removes spaces at beginning and end
            validate: { 
                notNull: { msg: "Please provide password" },
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { 
                notNull: { msg: "Please provide first name" },
                isAlpha: { msg: "Invalid first name" }
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { 
                notNull: { msg: "Please provide last name" },
                isAlpha: { msg: "Invalid last name" }
            }
        },
    }, {
        timestamps: false
    });
    return Student;
    };



/*
let students = [
    {
        id: 1, 
        email: "mandruska@gmail.com", 
        password: "mandruska5",
        first_name: "Martynas", 
        last_name: "Andruska"
    },
    {
        id: 2, 
        email: "jsatkunaite@gmail.com", 
        password: "jsatkunaite5",
        first_name: "Jurgita", 
        last_name: "Satkunaite"
    },
    ];
    
    module.exports = students;
*/