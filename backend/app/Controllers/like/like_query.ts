import Like from "#models/like";
import PostQuery from "../post/post_query.js";
export default class LikeQuery{
    private postQuery:PostQuery
    constructor(){
        this.postQuery=new PostQuery()
    }
    public async LikePost(postId:number,userId:number){
         await Like.create({postId,userId});
         const nol=await this.postQuery.getLike(postId)
         const ln=await this.postQuery.showLikers(postId);
         return {nol,ln}
    }
    public async DeleteLike(postId:number,userId:number){
         await Like.query().where('userId',userId).andWhere('postId',postId).delete()
        const nol=await this.postQuery.getLike(postId)
         const ln=await this.postQuery.showLikers(postId);
         return {nol,ln}
    }
    
      
}