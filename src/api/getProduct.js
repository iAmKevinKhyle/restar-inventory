// import axios from "axios";

// Real
// export const getProduct = async (id) => {
//   try {

//     const res = await axios.get(`/api/products/$id}`);

//     // Expect backend returns { ...data }
//     return res.data;
//   } catch (error) {
//     console.error("Failed to fetch products:", error);
//     throw error;
//   }
// };

// Simulated
export const getProduct = async ({ id }) => {
  const res = await fetch("/data/products-data-table.json");
  if (!res.ok) {
    throw new Error(`No Product Found!`);
  }
  
  const allData = await res.json();

  let product = allData;
  if (id) {
    product = product.filter((p) => p.product_id === id);
  }
  
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (product.length === 0) {
    throw new Error(`No product with an id of ${id} found!`);
  }

  return {
    data: product[0]
  };
};
