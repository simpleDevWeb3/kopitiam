import { PostReq } from "../helpers/apiHelper";

async function loginApi(formData) {
  try {
    const data = await PostReq(
      "https://localhost:7071/api/Auth/login",
      formData
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function registerApi(formData) {
  try {
    return await PostReq("https://localhost:7071/api/Auth/signup", formData);
  } catch (error) {
    console.log(error);
  }
}

async function logoutApi(formData) {
  try {
    return await PostReq("https://localhost:7071/api/Auth/logout", formData);
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentUserApi() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null; // no token, user not authenticated

    const res = await fetch("https://localhost:7071/api/Auth/current", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch current user");
    }

    const data = await res.json();
    return data.profile || null;
  } catch (err) {
    console.log("getCurrentUserApi error:", err);
    return null;
  }
}

export { loginApi, registerApi, logoutApi, getCurrentUserApi };
