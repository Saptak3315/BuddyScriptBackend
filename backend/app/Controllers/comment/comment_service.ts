import CommentQuery from "./comment_query.js";
export default class CommentService{
    private commentQuery:CommentQuery
    constructor(){
        this.commentQuery=new CommentQuery()
    }
    public async CommentPost(data:{postId:number,text:string,userId:number}){
        return await this.commentQuery.CommentPost(data.postId,data.text,data.userId)
    }
    public async ShowReply(data:{commentId:number}){
        return await this.commentQuery.showReply(data.commentId)
    }
    public async ShowComment(data:{postId:number}){
        return await this.commentQuery.showComment(data.postId)
    }
}