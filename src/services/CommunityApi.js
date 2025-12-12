import { DeleteReq, GetReq, PostReq, PutReq } from "../helpers/apiHelper";

//curl 'https://localhost:7071/api/Community/adminCommunities/{adminId}'

async function getCreatedCommunityApi(user_id) {
  return await GetReq(
    `https://localhost:7071/api/Community/adminCommunities/${user_id}`
  );
}

//curl 'https://localhost:7071/api/Community/getAll?userId=''

async function getAllCommunityApi(user_id) {
  return await GetReq(
    `https://localhost:7071/api/Community/getAll?userId=${user_id}`
  );
}

//curl 'https://localhost:7071/api/Community/getById?id=&userId='
async function getCommunityApi(community_id, user_id) {
  return await GetReq(
    `https://localhost:7071/api/Community/getById?id=${community_id}&userId=${user_id}`
  );
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
/**
 * curl 'https://localhost:7071/api/Community/leave?userId=&communityId=' \
  --request DELETE
 */
async function leaveCommunityApi(formData) {
  const { user_id, community_id } = formData;
  return await DeleteReq(
    `https://localhost:7071/api/Community/leave?userId=${user_id}&communityId=${community_id}`
  );
}
/**
 * curl 'https://localhost:7071/api/Post/getPost?current_user=null&user_id=null&post_title=null&post_id=null&community_id=null&page=1&pageSize=10'
 */
async function getAllCommunityPostApi(community_id, page = 1, pageSize = 3) {
  return await GetReq(
    `https://localhost:7071/api/Post/getPost?current_user=null&user_id=null&post_title=null&post_id=null&community_id=${community_id}&page=${page}&pageSize=${pageSize}`
  );
}

/**
 * curl 'https://localhost:7071/api/Community/search?keyword='
 */

async function searchCommunityApi(query) {
  return await GetReq(
    `https://localhost:7071/api/Community/search?keyword=${query}`
  );
}
/**
 *curl 'https://localhost:7071/api/Community/userCommunities?userId='
 */

async function getUserJoinedCommunityApi(user_id) {
  return await GetReq(
    `https://localhost:7071/api/Community/userCommunities?userId=${user_id}`
  );
}

/**
 * curl https://localhost:7071/api/Community/update \
  --request PUT \
  --header 'Content-Type: multipart/form-data' \
  --form 'CommunityId=' \
  --form 'Name=' \
  --form 'Description=' \
  --form 'bannerFile=' \
  --form 'avatarFile='
 */

async function editCommunityProfileApi(formData) {
  const form = new FormData();
  form.append("CommunityId", formData?.id);
  form.append("Name", formData?.name);
  form.append("Description", formData?.description);
  form.append("bannerFile", formData?.bannerUrl);
  form.append("avatarFile", formData?.avatarUrl);

  return await PutReq(
    `https://localhost:7071/api/Community/update`,
    form,
    "multipart/form-data"
  );
}

export {
  getAllCommunityApi,
  getCommunityApi,
  createCommunityApi,
  joinCommunityApi,
  getAllCommunityPostApi,
  searchCommunityApi,
  getUserJoinedCommunityApi,
  getCreatedCommunityApi,
  leaveCommunityApi,
  editCommunityProfileApi,
};
