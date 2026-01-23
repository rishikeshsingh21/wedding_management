import mongoose from "mongoose";

const weddingVendorSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true
    },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true
    },

    serviceType: String,

    cost: Number,

    status: {
      type: String,
      enum: ["pending", "booked", "cancelled"],
      default: "pending"
    },

    paymentStatus: {
      type: String,
      enum: ["not_paid", "advance_paid", "fully_paid"],
      default: "not_paid"
    }
  },
  { timestamps: true }
);

const WeddingVendor = mongoose.model("WeddingVendor", weddingVendorSchema);

export default WeddingVendor;
