import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true
    },

    totalBudget: Number,

    categories: {
      venue: Number,
      catering: Number,
      photography: Number,
      decoration: Number,
      others: Number
    },

    spent: {
      venue: Number,
      catering: Number,
      photography: Number,
      decoration: Number,
      others: Number
    }
  },
  { timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
