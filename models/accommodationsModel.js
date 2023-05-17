module.exports = (sequelize, DataTypes) => {
   const Accommodation = sequelize.define("accommodations", {
      title: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      area: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {
               msg: "Please provide area name"
            },
         }
      },
      adress: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {
               msg: "Please provide adress of accommodation"
            },
         }
      },
      room_type: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {
               msg: "Please specify room type"
            },
            isIn: {
               args: ['Private bedroom with common area', 'Shared bedroom with common area', 'Entire apartment', 'Entire house'],
               msg: "Invalid room type. Can be 'Private bedroom with common area', 'Shared bedroom with common area', 'Entire apartment' or 'Entire house'"
            }
         },
      },
      number_of_beds: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: { 
            notNull: {
               msg: "Please specify number of beds"
            },
            isInt: { msg: "Invalid number of beds. Must be positive integer" },
            isNonNegative (value) {
               if (value < 0) {
                  throw new Error('Invalid number of beds. Must be positive integer');
               }
            }
         }
      },
      bed_type: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {
               msg: "Please specify bed type"
            },
            isIn: {
               args: ['Single', 'Double', 'Twin', 'Bunk'],
               msg: "Invalid bed type. Can be 'Single', 'Double', 'Twin' or 'Bunk'"
         }
         },
      },
      max_guests: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notNull: {
               msg: "Please specify maximum number of guests"
            }, 
            isInt: { msg: "Invalid maximum guests. Must be positive integer" },
            isNonNegative (value) {
               if (value <= 0) {
                  throw new Error('Invalid maximum guests. Must be positive integer');
               }
            }
         }
      },
      available_from: {
         type: DataTypes.DATE,
         allowNull: true,
         validate: { 
            isDate: { msg: "Must be date" }
         }
      },
      minimum_stay: {
         type: DataTypes.INTEGER,
         allowNull: true,
         validate: { 
            isInt: { msg: "Invalid minimum stay. Must be positive integer." },
            isNonNegative (value) {
               if (value <= 0) {
                  throw new Error('Invalid minimum stay. Must be positive integer.');
               }
            }
         }
      },
      rating: {
         type: DataTypes.FLOAT,
         allowNull: true
      },
      price: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: { 
            notNull: {
               msg: "Please specify price"
            },
            checkPrice(value) {
               const priceRegexp = /^[0-9]+[\/](night|month)$/;
               if (!priceRegexp.test(value)) {
                   throw new Error('Invalid price format. Should be: value/night or month');
               }
           }
         }
      },
      validated: {
         type: DataTypes.BOOLEAN,
         default: false,
      }
   }, {
       timestamps: false
   });
   return Accommodation;
   };


/*
let accommodations = [
    {
      id: 1, 
      title: "Sunny apartment", 
      area: "Porto", 
      address: "Rua das Flores 32, 4050-262",
      room_type: "Entire apartment", 
      number_of_beds: 1, 
      bed_type: "Double", 
      max_guests: 2,
      available_from: "June 1",
      minimum_stay: "30 days", 
      price: "400", 
      amenities: [
        "Wi-fi", "Towels", "Microwave"
      ]
   },
    {id: 2, title: "Sunny apartment", area: "Porto", address: "Rua das Flores 32, 4050-262",
     room_type: "Entire apartment", number_of_beds: 1, bed_type: "Double", max_guests: 2,
     available_from: "June 1", minimum_stay: "30 days", price: "400", amenities: [
        "Wi-fi", "Towels", "Microwave"
     ]},
    ];

    module.exports = accommodations;
*/   