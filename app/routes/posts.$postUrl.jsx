import React from "react";
import { getPost } from "~/models/posts.server";

export async function loader({ params }) {
  const { postUrl } = params;
  // console.log(postUrl);
  const post = await getPost(postUrl);
  // console.log(post);
  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Entrada no encontrada",
    });
  }
  return post;
}

const Post = () => {
  return <div>posts.$postUrl</div>;
};

export default Post;
