import Service from "../models/service.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { uploadImagesToCloudinary } from "../utils/cloudinary.js";

const createService = AsyncHandler(async (req, res) => {
  try {
    const vendorId = req.user._id;

    const vendor = await User.findById(vendorId);

    if (!vendor || vendor.role !== "vendor") {
      return res.status(403).json(
        new ApiError(
          403,
          "Only approved vendors can create services"
        )
      );
    }


    if (vendor.isBlocked) {
      return res
        .status(403)
        .json(
            new ApiResponse(
                403,
                [],
                "You are blocked and cannot create services"
            )
        );
    }

    const isApproved = vendor.vendorProfile?.isApproved ?? false;

    // Count vendor services
    const serviceCount = await Service.countDocuments({
      vendor: vendorId,
    });

    //Restrict unapproved vendors to ONE service
    if (!isApproved && serviceCount >= 1) {
      return res.
      status(403)
      .json(
        new ApiError(
          403,
          "You can add only one service until admin approves your vendor profile"
        )
      );
    }

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = await uploadImagesToCloudinary(req.files, "wedding_management/vendor-services");
    }


    const service = await Service.create({
      vendor: vendorId,
      ...req.body,
      images: imageUrls,
      isApproved: false,
      status: "pending",
    });

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            service,
            "Service created successfully and is pending admin approval"
        )
    );
  } catch (error) {
    console.error("Create Service Error:", error);
    return res
    .status(500)
    .json(
        new ApiError(
            500,
            "Internal Server Error",
            "Error while creating service"
        )
    );
  }
})


export {    
    createService   
};