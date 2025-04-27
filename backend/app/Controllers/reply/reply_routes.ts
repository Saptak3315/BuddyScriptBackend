import router from "@adonisjs/core/services/router";
import replyController from "./reply_controller.js";
router.post('/reply',[replyController,'replyComment'])