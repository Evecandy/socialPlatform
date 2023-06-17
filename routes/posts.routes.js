import { getPosts, createPosts, getOnePost, updatePost, deletePost } from "../controllers/posts.controller.js";

const postsRoutes = (app) => {
app.route("/posts")
   .get(getPosts)
   .post(createPosts);
app.route("/posts/:postId").get(getOnePost).put(updatePost).delete(deletePost);


  
  };

  export default postsRoutes;