import axios from "axios";

export const getStockData = async () => {
  try {
    const response = await axios.get("../../__mock__/stock-data.json");
    
    await new Promise((resolve) => setTimeout(resolve, 4000));

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch chart data: " + error.message);
  }
};

export const getProductData = async () => {
  try {
    const response = await axios.get("../../__mock__/product-data.json");

    await new Promise((resolve) => setTimeout(resolve, 4000));

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch chart data: " + error.message);
  }
};

export const getCategoryData = async () => {
  try {
    const response = await axios.get("../../__mock__/category-data.json");

    await new Promise((resolve) => setTimeout(resolve, 4000));

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch chart data: " + error.message);
  }
};

export const getSupplierData = async () => {
  try {
    const response = await axios.get("../../__mock__/supplier-data.json");

    await new Promise((resolve) => setTimeout(resolve, 4000));

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch chart data: " + error.message);
  }
};