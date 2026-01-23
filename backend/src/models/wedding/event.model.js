import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true
    },

    eventName: String,
    date: Date,
    time: String,
    venue: String,

    status: {
      type: String,
      default: "scheduled"
    }
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event
