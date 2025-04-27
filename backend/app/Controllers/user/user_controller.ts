import { HttpContext } from '@adonisjs/core/http'
import UserService from './user_service.js'
import { Validator} from './user_validator.js'

export default class UserController {
  private userService:UserService
  constructor(){
    this.userService=new UserService()
  }
  public async userCreate({request,response}:HttpContext){
    const payload=await request.validateUsing(Validator)
    const user=await this.userService.RegisterUser(payload)
    return response.send(user)
  }
  public async LoginUser({request,auth}:HttpContext){
    const payload=await request.validateUsing(Validator)

    const user=await this.userService.LoginUser(payload)
    await auth.use('web').login(user)
    return auth.use('web').user
  }
  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    // return response.redirect('/login')
    return response.send({ message: 'Logged out successfully' })
  }
  public async isLoggedIn({ auth }: HttpContext) {
    // const user = auth.use('web').user
    const user = auth.getUserOrFail()
    return user
  }
}
