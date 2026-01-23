import mongoose from "mongoose";

const weddingSchema = new mongoose.Schema(
  {
    coupleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    brideName: {
      type: String,
      required: true
    },

    groomName: {
      type: String,
      required: true
    },

    weddingDate: {
      type: Date,
      required: true
    },

    city: String,

    status: {
      type: String,
      enum: ["planning", "active", "completed"],
      default: "planning"
    }
  },
  { timestamps: true }
);

const Wedding = mongoose.model("Wedding", weddingSchema);


export default Wedding