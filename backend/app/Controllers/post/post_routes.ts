import router from "@adonisjs/core/services/router";
import PostController from "./post_controller.js";
router.post('/cp',[PostController,'createPost'])
router.post('/up',[PostController,'updatePost'])
router.post('/dp',[PostController,'deletePost'])
router.get('/gl',[PostController,'getLike'])
router.get('/sl',[PostController,'showLikers'])
router.get('/sc',[PostController,'showComment'])
router.get('/ap',[PostController,'AllPost'])
router.get('/gc',[PostController,'getComment'])