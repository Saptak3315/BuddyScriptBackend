import router from "@adonisjs/core/services/router";
import PostController from "./post_controller.js";
import { middleware } from "#start/kernel";
router.post('/cp',[PostController,'createPost'])
router.post('/up',[PostController,'updatePost']).use(middleware.auth())
router.post('/dp',[PostController,'deletePost']).use(middleware.auth())
router.get('/gl',[PostController,'getLike'])
router.get('/sl',[PostController,'showLikers'])
router.get('/sc',[PostController,'showComment'])
router.get('/ap/:page',[PostController,'AllPost'])
router.get('/gc',[PostController,'getComment'])