import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "photography",
        "videography",
        "catering",
        "decoration",
        "makeup",
        "music",
        "venue",
        "other",
      ],
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min:[0, "Price cannot be negative"]
    },

    priceType: {
      type: String,
      enum: ["per_day", "per_event", "per_hour"],
      default: "per_event",
    },

    location: {
      city: String,
      area: String,
      address: String,
      pincode: String,
    },

    details: {
      type: mongoose.Schema.Types.Mixed, // category specific details
    },

    images: [
      {
        type: String, // Cloudinary URLs
        required: true,
        validate: {
          validator: function (v) {
            return v.length > 0;
          },
          message: "At least one image is required.",
        },
      },
    ],

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    
    isAvailable: {
      type: Boolean,
      default: true,
    },

    isApproved: {
      type: Boolean,
      default: false, // Admin approval
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
