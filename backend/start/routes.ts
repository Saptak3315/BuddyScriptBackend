/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import User from '#models/user'
import Post from '#models/post'
import router from '@adonisjs/core/services/router'
import '../app/Controllers/user/user_routes.js'
import '../app/Controllers/post/post_routes.js'
import '../app/Controllers/like/like_routes.js'
import '../app/Controllers/comment/comment_routes.js'
import '../app/Controllers/reply/reply_routes.js'
router.get('/', async () => {
  //return User.query().preload('posts')
  return User.query().preload('posts')
})
