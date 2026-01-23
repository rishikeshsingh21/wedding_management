import Service from "../models/service.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const getServicesByCategory = async (req, res) => {
  try {
    //console.log("reqQuery",req.query);
    const { category } = req.query;

    if (!category) {
      return res
      .status(400)
      .json(
        new ApiError(
            400,
            "category is required"
        )
      );
    }

    const services = await Service.find({
      category,
      status: "approved",
      isAvailable: true,
    })
      .select("title description price priceType images location details")
      .sort({ createdAt: -1 });//Descending (newest → oldest)

      console.log(services)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                services,
                Count: services.length,
            },
            `List of servieces for category: ${category}`
        )
    );
  } catch (error) {
    return res
    .status(500)
    .json(
        new ApiError(
            500,
            "Failed to fetch the services by category"
        )
    )
  }
};


export {
    getServicesByCategory
}