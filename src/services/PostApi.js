import { GetReq, PostReq } from "../helpers/apiHelper";

async function getAllPostApi(user_id, page = 1) {
  console.log(user_id ? user_id : null);
  return await GetReq(
    `https://localhost:7071/api/Post/getPost?user_id=${
      user_id ? user_id : null
    }&post_title=null&page=${page}`
  );
}
async function createPostApi(postData) {
  const fd = new FormData();
  fd.append("user_id", postData?.user_id);
  fd.append("topic_id", postData?.topic_id);
  fd.append("community_id", postData?.community_id);
  fd.append("title", postData?.title);
  fd.append("text", postData?.text);

  if (postData?.image && !Array.isArray(postData.image))
    fd.append("image", postData?.image);

  if (postData?.image && Array.isArray(postData.image)) {
    postData.image.forEach((file) => {
      fd.append("image", file);
    });
  }
  try {
    return await PostReq("https://localhost:7071/api/Post/createPost", fd);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export { createPostApi, getAllPostApi };
