import { GetReq, PostReq } from "../helpers/apiHelper";

async function loginApi(formData) {
  try {
    const data = await PostReq(
      "https://localhost:7071/api/Auth/login",
      formData
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function registerApi(formData) {
  const fd = new FormData();
  fd.append("Email", formData.Email);
  fd.append("Password", formData.Password);
  fd.append("name", formData.username);
  fd.append("bio", formData.userDescription);

  // Files
  fd.append("AvatarFile", formData.icon); // File object
  fd.append("BannerFile", formData.banner); // File object

  // Preferences (array)
  formData.preference.forEach((p) => fd.append("preference", p));

  try {
    return await PostReq("https://localhost:7071/api/Auth/signup", fd);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function logoutApi(formData) {
  try {
    return await PostReq("https://localhost:7071/api/Auth/logout", formData);
  } catch (err) {
    console.log(err);
    throw err;
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
    throw err;
  }
}

async function getIsDupUsernameApi(username) {
  try {
    return await GetReq(
      `https://localhost:7071/api/Auth/checkDuplicateUsername?username=${username}`
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getIsDupEmailApi(email) {
  try {
    return await GetReq(
      `https://localhost:7071/api/Auth/checkDuplicateEmail?email=${email}`
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * curl 'https://localhost:7071/api/Auth/editAccount/{user_id}' \
  --request POST \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'name=' \
  --data-urlencode 'Password=' \
  --data-urlencode 'bio=' \
  --data-urlencode 'AvatarFile=' \
  --data-urlencode 'BannerFile=' \
  --data-urlencode 'Preference='
 */

// services/AuthApi.js

async function editAccountApi(user_id, payload) {
  // 1. Use FormData (this automatically sets multipart/form-data)
  const data = new FormData();

  // 2. Append text fields safely
  if (payload?.name) data.append("name", payload.name);
  if (payload?.bio) data.append("bio", payload.bio);
  if (payload?.Password) data.append("Password", payload.Password);

  // 3. Append the actual File objects
  if (payload?.AvatarFile) {
    data.append("AvatarFile", payload.AvatarFile);
  }
  if (payload?.BannerFile) {
    data.append("BannerFile", payload.BannerFile);
  }

  // 4. Send the request
  // IMPORTANT: Do NOT manually set 'Content-Type'. Let the browser do it.
  return await PostReq(
    `https://localhost:7071/api/Auth/editAccount/${user_id}`,
    data
  );
}

export {
  loginApi,
  registerApi,
  logoutApi,
  getCurrentUserApi,
  getIsDupEmailApi,
  getIsDupUsernameApi,
  editAccountApi,
};
