import { HttpContext } from "@adonisjs/core/http";
import ReplyService from "./reply_service.js";
import { replyValidate } from "./reply_validator.js";
export default class replyController{
    private replyService:ReplyService
    constructor(){
        this.replyService=new ReplyService()
    }
    public async replyComment({request,response}:HttpContext){
        const payload=await request.validateUsing(replyValidate)
        const reply=await this.replyService.ReplyPost(payload)
        response.send(reply)
    }
}