import { DateTime } from "luxon";
import PostQuery from "./post_query.js";
import Post from "#models/post";
import { Exception } from "@adonisjs/core/exceptions";
export default class PostService{
    private postQuery:PostQuery
    constructor(){
        this.postQuery=new PostQuery
    }
    public async CreatePost(data:{content:string,userId:number}){
        return await this.postQuery.createPost(data.content,data.userId)
    }
    public async DeletePost(data:{postId:number},userId:number){
        const pid=await Post.query().where('id',data.postId);
        console.log(pid);
        if(pid[0].$attributes.userId===userId){
            return await this.postQuery.deletePost(data.postId);
        }
        else {
            throw new Exception("Error While Deleting")
        }
    }
    public async UpdatePost(data:{postId:number,content:string},userId:number){
        const pid=await Post.query().where('id',data.postId);
        console.log(pid);
        if(pid[0].$attributes.userId===userId){
            return await this.postQuery.updatePost(data.postId,data.content,userId)
        }
        else {
            throw new Exception("Error While Updating")
        }
    }
    public async GetLike(data:{postId:number}){
        return await this.postQuery.getLike(data.postId)
    }
    public async GetComment(data:{postId:number}){
        return await this.postQuery.getComment(data.postId)
    }
    public async ShowLikers(data:{postId:number}){
        return await this.postQuery.showLikers(data.postId)
    }
    public async ShowComments(data:{postId:number}){
        return await this.postQuery.showComments(data.postId)
    }
    public async AllPost(userId:number,page:number){
        return await this.postQuery.AllPost(userId,page)
    }
}