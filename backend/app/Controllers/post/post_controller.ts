import PostService from "./post_service.js";
import { HttpContext } from "@adonisjs/core/http";
import { CreatePost, DeletePost, UpdatePost,getLike, showLikers, showComments,getComment,showallPost } from "./post_validator.js";

export default class PostController{
    private postService: PostService
    constructor(){
        this.postService=new PostService()
    }
    public async createPost({request,response}:HttpContext){
        const payload=await request.validateUsing(CreatePost);
        const post=await this.postService.CreatePost(payload);
        return response.send(post)
    }
    public async updatePost({request,response}:HttpContext){
        const payload=await request.validateUsing(UpdatePost);
        const post=await this.postService.UpdatePost(payload);
        return response.send(post)
    }
    public async deletePost({request,response}:HttpContext){
        const payload=await request.validateUsing(DeletePost);
        const post=await this.postService.DeletePost(payload);
        return response.send(post)
    }
    public async getLike({request,response}:HttpContext){
        const payload=await request.validateUsing(getLike);
        const like=await this.postService.GetLike(payload);
        return response.send(like)
    }
    public async showLikers({request,response}:HttpContext){
        const payload=await request.validateUsing(showLikers);
        const like=await this.postService.ShowLikers(payload);
        return response.send(like)
    }
    public async getComment({request,response}:HttpContext){
        const payload=await request.validateUsing(getComment);
        const like=await this.postService.GetComment(payload);
        return response.send(like)
    }
    public async showComment({request,response}:HttpContext){
        const payload=await request.validateUsing(showComments);
        const comment=await this.postService.ShowComments(payload);
        return response.send(comment)
    }
    public async AllPost({request,response,auth}:HttpContext){
        const {page}=request.params()
        const user=await auth.authenticate()
        const comment=await this.postService.AllPost(user.id,page);
        return response.send(comment)
    }
}