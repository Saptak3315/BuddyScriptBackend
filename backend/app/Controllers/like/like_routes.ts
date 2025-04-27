import router from "@adonisjs/core/services/router";
import LikeController from "./like_controller.js";
router.post('/like',[LikeController,"createLike"])
router.post('/dl',[LikeController,"deleteLike"])
router.post('/celi',[LikeController,"LikeCheck"])