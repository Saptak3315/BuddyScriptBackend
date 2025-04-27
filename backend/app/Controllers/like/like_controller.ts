import { HttpContext } from "@adonisjs/core/http";
import LikeServie from "./like_service.js";
import { likeValidate } from "./like_validator.js";
export default class LikeController{
    private likeService:LikeServie
    constructor(){
        this.likeService=new LikeServie()
    }
    public async createLike({request,response}:HttpContext){
        const payload=await request.validateUsing(likeValidate)
        const like=await this.likeService.LikePost(payload)
        response.send(like)
    }
    public async deleteLike({request,response}:HttpContext){
        const payload=await request.validateUsing(likeValidate)
        const like=await this.likeService.DeleteLike(payload)
        response.send(like)
    }
    public async LikeCheck({request,response}:HttpContext){
        const payload=await request.validateUsing(likeValidate)
        const like=await this.likeService.CheckLike(payload)
        response.send(like)
    }
}