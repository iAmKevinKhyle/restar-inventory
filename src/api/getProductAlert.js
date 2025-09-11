import axios from "axios";

export const getProductAlert = async () => {
  try {
    const response = await axios.get("../../__mock__/product-alert.json");

    // random delay (3-5 seconds)
    const delay = Math.floor(Math.random() * 5000) + 3000;

    // Simulate 3s delay
    await new Promise((resolve) => setTimeout(resolve, delay));

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch product alert data: " + error.message);
  }
};
