import ReplyQuery from "./reply_query.js"
export default class ReplyService{
    private replyQuery:ReplyQuery
    constructor(){
        this.replyQuery=new ReplyQuery()
    }
    public async ReplyPost(data:{commentId:number,text:string,createdAt:number,userId:number}){
        return await this.replyQuery.Reply(data.commentId,data.text,data.createdAt,data.userId)
    }
}