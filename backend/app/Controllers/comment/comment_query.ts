import Comment from "#models/comment";
import Reply from "#models/reply";
export default class CommentQuery{
    public async CommentPost(postId:number,text:string,userId:number){
        const res=await Comment.create({postId,text,userId})
        return await Comment.query().where('id',res.id).preload('user')
    }
    public async showReply(commentId:number){
        return await Reply.query().where('commentId',commentId).preload('user');
    }
    public async showComment(postId:number){
        return await Comment.query().where('postId',postId).limit(7).preload('user');
    }
}