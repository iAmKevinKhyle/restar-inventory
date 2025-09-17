// import axios from "axios";

// Real
// export const getUser= async (id) => {
//   try {

//     const res = await axios.get(`/api/users/$id}`);

//     // Expect backend returns { ...data }
//     return res.data;
//   } catch (error) {
//     console.error("Failed to fetch users:", error);
//     throw error;
//   }
// };

// Simulated
export const getUser = async ({ username }) => {
  const res = await fetch("/data/users-data-table.json");
  if (!res.ok) {
    throw new Error(`No User Found!`);
  }
  
  const allData = await res.json();

  let user = allData;
  if (username) {
    user = user.filter((u) => u.username === username);
  }
  
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (user.length === 0) {
    throw new Error(`No user with an username of ${username} found!`);
  }

  return {
    data: user[0]
  };
};
