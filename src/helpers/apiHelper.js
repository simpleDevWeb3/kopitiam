import axios from "axios";

export async function PostReq(apiUrl, data) {
  const token = localStorage.getItem("token"); // read token from storage if needed
  const res = await axios.post(apiUrl, data, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // attach token if exists
    },
  });
  return res.data;
}
