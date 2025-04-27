import router from '@adonisjs/core/services/router'
import UserController from './user_controller.js'
import { middleware } from '#start/kernel'
router.post('/register',[UserController,'userCreate'])
router.post('/login',[UserController,'LoginUser'])
router.get('/logout',[UserController,'logout']).use(middleware.auth())
router.get('/islogin',[UserController,'isLoggedIn']).use(middleware.auth())