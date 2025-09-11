import axios from "axios";

export const getSummary = async () => {
  try {
    const response = await axios.get("../../__mock__/summary-cards.json");
    
    await new Promise((resolve) => setTimeout(resolve, 4000));

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch summary data: " + error.message);
  }
};
