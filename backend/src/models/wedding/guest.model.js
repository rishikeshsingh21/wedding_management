import mongoose from "mongoose";

const guestSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true
    },

    name: String,
    relation: String,
    phone: String,

    inviteStatus: {
      type: String,
      enum: ["sent", "pending"],
      default: "pending"
    },

    attendance: {
      type: String,
      enum: ["confirmed", "not_confirmed"],
      default: "not_confirmed"
    }
  },
  { timestamps: true }
);

const Guest = mongoose.model("Guest", guestSchema);

export default Guest;
