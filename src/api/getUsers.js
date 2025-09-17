// import axios from "axios";

// Real
// export const getUsers = async ({
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
//     if (filters.role) params.role = filters.role;
//     if (filters.status) params.status = filters.status;

//     const res = await axios.get("/api/users", { params });

//     // Expect backend returns { data: [...], total: number }
//     return res.data;
//   } catch (error) {
//     console.error("Failed to fetch users:", error);
//     throw error;
//   }
// };

// Simulated
export const getUsers = async ({
  page = 1,
  pageSize = 10,
  search = "",
  filters = {},
}) => {
  const res = await fetch("/data/users-data-table.json");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const allData = await res.json();

  let filtered = allData;
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.username.toLowerCase().includes(s) ||
        p.fullName.toLowerCase().includes(s) ||
        p.email.toLowerCase().includes(s)
    );
  }

  if (filters.role) {
    filtered = filtered.filter((p) => p.role === filters.role);
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
