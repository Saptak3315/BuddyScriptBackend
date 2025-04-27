import { HttpContext } from "@adonisjs/core/http";
import CommentService from "./comment_service.js";
import { commentValidate,ReplyValidate,ShowComment } from "./comment_validator.js";
export default class CommentController{
    private commentService:CommentService
    constructor(){
        this.commentService=new CommentService()
    }
    public async createComment({request,response}:HttpContext){
        //console.log(await request.body())
        const payload=await request.validateUsing(commentValidate)
        //console.log(payload)
        const comment=await this.commentService.CommentPost(payload)
        response.send(comment)
    }
    public async showReply({params, request,response}:HttpContext){
            request.all().commentId = params.commentId
            const payload=await request.validateUsing(ReplyValidate);
            console.log(payload);
            const comment=await this.commentService.ShowReply(payload);
            return response.send(comment)
    }
    public async showComment({request,response}:HttpContext){
        const payload=await request.validateUsing(ShowComment);
        const comment=await this.commentService.ShowComment(payload);
        return response.send(comment)
    }
}