// import axios from "axios";
import dayjs from "dayjs";

// export const getDeliveries = async ({
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

export const getDelivery = async ({ id }) => {
  const res = await fetch("/data/delivery-data-table.json");
  
  if (!res.ok) {
    throw new Error(`No Delivery Found!`);
  }

  const allData = await res.json();

  let delivery = allData;
  if (id) {
    delivery = delivery.filter((p) => p.id === id);
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (delivery.length === 0) {
    throw new Error(`No delivery with an id of ${id} found!`);
  }

  return {
    data: delivery[0],
  };
};

export const getDeliveries = async ({
  page = 1,
  pageSize = 10,
  search = "",
  filters = {},
}) => {
  const res = await fetch("/data/delivery-data-table.json");
  if (!res.ok) {
    throw new Error("Failed to fetch deliveries");
  }

  const allData = await res.json();

  let filtered = allData;
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.id.toLowerCase().includes(s) ||
        p.customer.toLowerCase().includes(s) ||
        p.driver.toLowerCase().includes(s)
    );
  }

  if (filters.startDate && filters.endDate) {
    const start = dayjs(filters.startDate);
    const end = dayjs(filters.endDate);

    const minDate = start.isBefore(end) ? start : end;
    const maxDate = start.isBefore(end) ? end : start;

    filtered = filtered.filter((p) => {
      const d = dayjs(p.date);
      return (
        (d.isSame(minDate, "day") || d.isAfter(minDate, "day")) &&
        (d.isSame(maxDate, "day") || d.isBefore(maxDate, "day"))
      );
    });
  }
  if (filters.product) {
    filtered = filtered.filter((p) =>
      p.products.some((prod) => prod.product === filters.product)
    );
  }
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

export const getAllDeliveries = async () => {
  const res = await fetch("/data/delivery-data-table.json");

  if (!res.ok) {
    throw new Error("Failed to fetch all deliveries");
  }

  const allData = await res.json();

  const total = allData.length;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: allData,
    total,
  };
};
