import axios from "axios";

export const getProductAlert = async () => {
  try {
    const response = await axios.get("../../__mock__/product-alert.json");

    const delay = Math.floor(Math.random() * 5000) + 3000;

    await new Promise((resolve) => setTimeout(resolve, delay));

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch product alert data: " + error.message);
  }
};
