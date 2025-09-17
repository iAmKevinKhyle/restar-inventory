import axios from "axios";

const getStocksMovementData = async () => {
  try {
    const response = await axios.get("../../public/data/stock-movement-data.json");
    
    if (response.status !== 200) {
      throw new Error("Failed to fetch stock movement data");
    }

    await new Promise((response) => setTimeout(response, 2500));

    return response.json();
  } catch (error) {
    console.error("Error loading stock movement data:", error);
    return [];
  }
};

export default getStocksMovementData;