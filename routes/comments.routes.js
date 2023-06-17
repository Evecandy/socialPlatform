import { getComments, createComments, getOneComment, updateComment, deleteComment } from "../controllers/comments.controller.js";


const commentsRoutes = (app) => {
app.route("/comments").get(getComments).post(createComments);
app.route("/comments/:commentId").get(getOneComment).put(updateComment).delete(deleteComment);
};

export default commentsRoutes;