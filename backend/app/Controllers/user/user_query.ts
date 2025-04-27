import User from '#models/user'
export default class UserQuery {
  public async findByUsername(username: string) {
    return await User.query().where('username',username)
  }

  public async findByUser(username: string,password:string) {
    return await User.verifyCredentials(username,password)
  }
  public async createUser(username: string, password: string) {
    return await User.create({username,password});
  }
}
