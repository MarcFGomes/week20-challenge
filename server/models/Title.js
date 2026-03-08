const { Schema } = require('mongoose');

// Subdocument schema used inside User.savedTitles
const titleSchema = new Schema(
  {
    imdbID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
    },
    type: {
      type: String,
    },
    poster: {
      type: String,
    },
    plot: {
      type: String,
    },
    imdbRating: {
      type: String,
    },
    imdbLink: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

module.exports = titleSchema;
