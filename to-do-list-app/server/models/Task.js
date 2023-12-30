const mongoose = require("mongoose");

var taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    dueDate: { type: String },
    priority: {
      type: String,
      required: true,
      enum: ["Urgent", "High", "Medium", "Low"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Completed", "Ongoing", "Not Started"],
      default: "Pending",
    }, 
    userId: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
