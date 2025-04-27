import LikeQuery from "./like_query.js";
export default class LikeServie{
    private likeQuery:LikeQuery
    constructor(){
        this.likeQuery=new LikeQuery
    }
    public async LikePost(data:{postId:number,userId:number}){
        return await this.likeQuery.LikePost(data.postId,data.userId)
    }
    public async DeleteLike(data:{postId:number,userId:number}){
        return await this.likeQuery.DeleteLike(data.postId,data.userId)
    }
    public async CheckLike(data:{postId:number,userId:number}){
        return await this.likeQuery.TestLike(data.postId,data.userId)
    }
}