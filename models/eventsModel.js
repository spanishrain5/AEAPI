module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("events", {
        /*
        facilitator_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            default: 0,
        },
        */
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        area: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        event_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: { 
                isDate: { msg: "Must be date" }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        validated: {
            type: DataTypes.BOOLEAN,
            default: false,
        }
    }, {
        timestamps: false
    });
    return Event;
    };

/*
let events = [
    {
        id: 1, 
        title: "Peddy-Paper", 
        area: "Vila do Conde", 
        adress: "Rua Dom Sancho I 1",
        event_type: "Outdoor", 
        date: "24-03-23", 
        description: 
        "A treasure hunt around the most interesting spots of Vila do Conde"
    },
    {id: 2, title: "Peddy-Paper", area: "Vila do Conde", adress: "Rua Dom Sancho I 1",
     event_type: "Outdoor", date: "24-03-23", description: 
        "A treasure hunt around the most interesting spots of Vila do Conde"
    },
    ];
    
    module.exports = events;
*/
    