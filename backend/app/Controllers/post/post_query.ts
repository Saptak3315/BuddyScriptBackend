import Comment from "#models/comment";
import Like from "#models/like";
import Post from "#models/post";
import { DateTime } from "luxon";
export default class PostQuery{
    public async createPost(content:string,userId:number){
        const res=await Post.create({content,userId});
        return await Post.query().where('id',res.id).preload('user')
    }
    public async updatePost(postId:number,content:string){
        return await Post.query().where('id',postId).update({content})
    }
    public async deletePost(postId:number){
        return await Post.query().where('id',postId).delete()
    }
    public async getLike(postId:number) {
        const count = await Like.query().where('post_id', postId).count('* as total');
        return count[0].$extras.total;
    }
    public async getComment(postId:number){
      const count=await Comment.query().where('post_id',postId).count('* as total');
      return count[0].$extras.total;
    }
    public async showLikers(postId:number) {
        const likes = await Like.query()
          .where('post_id', postId)
          .preload('user').limit(15).orderBy('postId','desc'); 
        const users = likes.map(like => like.user.username);
        return users;
      }
      public async showComments(postId:number){
        return await Comment.query().where('postId',postId);
      }
      public async AllPost(){
        return await Post.query().orderBy('id','desc').preload('user').limit(20);
      }
}