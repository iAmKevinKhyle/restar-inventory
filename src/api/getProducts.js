// import axios from "axios";

// Real
// export const getProducts = async ({
//   page = 1,
//   pageSize = 10,
//   search = "",
//   filters = {},
// }) => {
//   try {
//     const params = {
//       page,
//       pageSize,
//     };

//     if (search) params.search = search;
//     if (filters.category) params.category = filters.category;
//    // if (filters.supplier) params.supplier = filters.supplier;
//     if (filters.status) params.status = filters.status;

//     const res = await axios.get("/api/products", { params });

//     // Expect backend returns { data: [...], total: number }
//     return res.data;
//   } catch (error) {
//     console.error("Failed to fetch products:", error);
//     throw error;
//   }
// };

// Simulated
export const getProducts = async ({
  page = 1,
  pageSize = 10,
  search = "",
  filters = {},
}) => {
  const res = await fetch("/data/products-data-table.json");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const allData = await res.json(); // Assume this is an array of products

  let filtered = allData;
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.barcode.toLowerCase().includes(s) ||
        p.product_id.toLowerCase().includes(s)
    );
  }

  if (filters.category) {
    filtered = filtered.filter((p) => p.category === filters.category);
  }
//   if (filters.supplier) {
//     filtered = filtered.filter((p) => p.supplier === filters.supplier);
//   }
  if (filters.status) {
    filtered = filtered.filter((p) => p.status === filters.status);
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginated = filtered.slice(start, end);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: paginated,
    total,
  };
};
