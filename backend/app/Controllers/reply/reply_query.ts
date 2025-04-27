import Reply from "#models/reply"
export default class ReplyQuery{
    public async Reply(commentId:number,text:string,createdAt:number,userId:number){
        const res=await Reply.create({commentId,text,createdAt,userId})
        return await Reply.query().where('id',res.id).preload('user')
    }
}