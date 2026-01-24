import API from "./axiosInstance"

export const createWedding = (data) =>
  API.post("/couples/wedding/create-wedding", data);

export const getWedding = () =>
  API.get("/couples/wedding");
