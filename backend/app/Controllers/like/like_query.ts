import Like from "#models/like";
export default class LikeQuery{
    public async LikePost(postId:number,userId:number){
        return await Like.create({postId,userId});
    }
    public async DeleteLike(postId:number,userId:number){
        return await Like.query().where('userId',userId).andWhere('postId',postId).delete()
    }
    public async TestLike(postId: number, userId: number){
        const res = await Like.findBy({ postId, userId });
        return res===null?false:true;
    }
      
}