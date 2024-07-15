const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: [true, "Required field"],
    },
    city :{
      type : String,
      required : [true, "Required field"],
    },
    description: {
      type: String,
      required: [true, "Required field"],
    },
    amenities: {
      type: String,
      required: [true, "Required field"],
    },
    phoneNo: {
      type: Number,
      required: [true, "Required field"],
    },
    address: {
      type: String,
      required: [true, "Required field"],
    },
    reviews: {
      type: Array
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const hotelModel = mongoose.model("hotel",hotelSchema);

module.exports = hotelModel;