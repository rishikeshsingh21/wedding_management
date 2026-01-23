import Wedding from "../models/wedding/wedding.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const createWedding = async (req, res) => {
  try {
    const coupleId = req.user._id;
    const { weddingName, brideName, groomName, weddingDate } = req.body;

    if (!weddingName || !brideName || !groomName || !weddingDate) {
      return res.status(400).json(
        new ApiError(400, "All fields are required")
      );
    }
    
    if (req.user.role !== "couple") {
        return res.status(403).json(
            new ApiError(
              403,
              "Only couple can create wedding"
            )
        );
    }

    const existingWedding = await Wedding.findOne({
      couple: coupleId,
      status: "planning",
    });

    if (existingWedding) {
      return res.status(400).json(
        new ApiError(400, "You already have an active wedding in planning stage")
      );
    }

    const wedding = await Wedding.create({
      couple: coupleId,
      weddingName,
      brideName,
      groomName,
      weddingDate,
    });

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            wedding,
            "Wedding created successfully"
        )
    )
  } catch (error) {
    console.error("Create Wedding Error:", error);
    return res
    .status(500)
    .json(
        new ApiError(
            500,
            "Internal Server Error",
            "Error while creating wedding"
        )
    );
  }
};

export {
  createWedding
}