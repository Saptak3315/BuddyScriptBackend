import router from "@adonisjs/core/services/router";
import CommentController from "./comment_controllers.js";
router.post('/comment',[CommentController,"createComment"])
router.get('/sr/:commentId',[CommentController,'showReply'])
router.get('/showcomment/:postId/:page',[CommentController,'showComment'])