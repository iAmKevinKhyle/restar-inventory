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

export const getProductSummaryCount = async () => {
  try {
    const response = await axios.get("../../__mock__/products-data-table.json");
    const data = response.data;
    const today = new Date();
    
    // total  product
    const total = data.length;

    // low stock
    let low = 0;
    
    // out if stock
    let out = 0;

    // expiring soon
    let expiring = 0;

    // expired product
    let expired = 0;

    data.forEach((item) => {
      if (item.quantity === 0) {
        out++;
        return;
      }

      if (item.quantity <= item.reorder_level) {
        low++;
      }

      if (item.expiry_date) {
        const expiry = new Date(item.expiry_date);
        const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);

        if (diffDays < 0) {
          expired++;
        } else if (diffDays <= 7) {
          expiring++;
        }
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      total,
      low,
      out,
      expiring,
      expired,
    };
  } catch (error) {
    throw new Error("Failed to fetch summary data: " + error.message);
  }
};
