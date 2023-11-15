// Connect to Api
// const BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://api.travel-stories.click"
//     : // : "http://localhost:3001"
//       "http://localhost:3001";

//const BASE_URL = "http://localhost:3001";
const BASE_URL = "http://travel-stories.click";

export const baseUrl = BASE_URL;
export const headers = {
  authorization: `Bearer ${localStorage.getItem("jwt")}`,
  "Content-Type": "application/json",
};
