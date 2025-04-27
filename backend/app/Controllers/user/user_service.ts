import UserQuery from './user_query.js'
import { Exception } from '@adonisjs/core/exceptions'
export default class UserService {
  private userQuery:UserQuery
  constructor(){
    this.userQuery=new UserQuery()
  }
  public async RegisterUser(data:{username:string,password:string}){
    const userinfo=await this.userQuery.findByUsername(data.username)
    console.log(userinfo);
    if(userinfo.length!==0){
      throw new Exception("User Already Exist",{
        status:409,
        code:'user exists'
      })
    }
    return await (this.userQuery.createUser(data.username,data.password))
  }
  public async LoginUser(data:{username:string,password:string}){
    return this.userQuery.findByUser(data.username,data.password);
  }
}
