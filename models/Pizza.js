const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal) //a 'getter': uses a helper function out of utils to make date pretty
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId, //tell Mongo we expect an ObjectId
        ref: 'Comment' //tell mongo that the data is coming from the Comment model
      }
    ]
  },
  {
    toJSON: { //additional mongo instructions
      virtuals: true,
      getters: true
    },
    id: false //we don't need the virual to return the ID
  }
);

// get total count of comments and replies on retrievalm like a helper with less overhead than a getter
PizzaSchema.virtual('commentCount').get(function() { //virtuals are built-in schema functions
  return this.comments.length;
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;