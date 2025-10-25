import { useVote } from "./useVote";
import { useNavigate } from "react-router-dom";

export function usePost(item, type = "post",comments = []) {
  const navigate = useNavigate();

  //Destructe
  const {
    id,
    title = type === "post" ? item.title : null,
    content,
    createdAt,
    votes,
    authorId,
    communityId = type === "post" ? item.communityId : null,
    parentId = type === "comment" ? item.parentId : null,
    postId = type === "comment" ? item.postId : null,
  } = item;

  const { handleDownVote, handleUpVote, upVote, downVote } = useVote();

  const commentCount =  comments?.filter(comment=>comment.postId === id).length || 0;

  function handleNavigate() {
    console.log("navigate");
    navigate(`/comment/${id}`);
  }

 

  //return
  const data = {
    id,
    title,
    content,
    createdAt,
    votes,
    authorId,
    communityId,
    parentId,
    postId,
    commentCount
  };

  const state = {
    upVote,
    downVote,
  };

  const actions = {
    handleDownVote,
    handleUpVote,
    handleNavigate,
  };

  return {
    data,
    state,
    actions,
  };
}
