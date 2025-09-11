import axios from "axios";

export const getRecentActions = async () => {
  try {
    const response = await axios.get("../../__mock__/recent-actions.json");

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch recent actions data: " + error.message);
  }
};

export const getRecentOrders = async () => {
  try {
    const response = await axios.get("../../__mock__/recent-orders.json");

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch recent orders data: " + error.message);
  }
};

export const getRecentStockMovements = async () => {
  try {
    const response = await axios.get("../../__mock__/recent-stock-movements.json");

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch recent stock movements data: " + error.message);
  }
};