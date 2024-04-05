const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  number: {
    type: String,
    minLength: 9,
    validate: {
      reason: "numberValidator",
      validator: (v) => {
        return /^\d{2,3}-\d{5,6}$/gm.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
