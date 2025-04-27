import { DateTime } from "luxon";
import PostQuery from "./post_query.js";
export default class PostService{
    private postQuery:PostQuery
    constructor(){
        this.postQuery=new PostQuery
    }
    public async CreatePost(data:{content:string,userId:number}){
        return await this.postQuery.createPost(data.content,data.userId)
    }
    public async DeletePost(data:{postId:number}){
        return await this.postQuery.deletePost(data.postId);
    }
    public async UpdatePost(data:{postId:number,content:string}){
        return await this.postQuery.updatePost(data.postId,data.content)
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
    public async AllPost(){
        return await this.postQuery.AllPost()
    }
}