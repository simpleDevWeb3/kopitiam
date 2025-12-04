import { GetReq, PostReq } from "../helpers/apiHelper";
//curl https://localhost:7071/api/Community/getall

async function getAllCommunityApi() {
  return await GetReq(`https://localhost:7071/api/Community/getall`);
}

//curl 'https://localhost:7071/api/Community/getbyid?id='
async function getCommunityApi(id) {
  return await GetReq(`https://localhost:7071/api/Community/getbyid?id=${id}`);
}

/**
 *curl https://localhost:7071/api/Community/create \
  --request POST \
  --header 'Content-Type: multipart/form-data' \
  --form 'AdminId=' \
  --form 'Name=' \
  --form 'Description=' \
  --form 'bannerFile=' \
  --form 'avatarFile=' \
  --form 'TopicIds='
 */

async function createCommunityApi(formData) {
  const fd = new FormData();
  fd.append("AdminId", formData.AdminId);
  fd.append("Name", formData.communityName);
  fd.append("Description", formData.communityDescription);

  fd.append("avatarFile", formData.icon); // File object
  fd.append("bannerFile", formData.banner); // File object

  // Preferences (array)
  formData.topics.forEach((topic) => fd.append("TopicIds", topic));

  return await PostReq(`https://localhost:7071/api/Community/create`, fd);
}

/**
 *curl 'https://localhost:7071/api/Community/join?userId=&communityId=' \
  --request POST
 */
async function joinCommunityApi(formData) {
  const { user_id, community_id } = formData;
  return await PostReq(
    `https://localhost:7071/api/Community/join?userId=${user_id}&communityId=${community_id}`
  );
}

export {
  getAllCommunityApi,
  getCommunityApi,
  createCommunityApi,
  joinCommunityApi,
};
