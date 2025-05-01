import Comment from "#models/comment";
import Like from "#models/like";
import Post from "#models/post";
import { DateTime } from "luxon";
export default class PostQuery {
  public async createPost(content: string, userId: number) {
    const res = await Post.create({ content, userId });
    const post = await Post.query()
      .where('id', res.id).preload('user')

    const isLiked = await this.TestLike(res.id, userId);
    const likeCount = await this.getLike(res.id);
    const likers = await this.showLikers(res.id);
    const commentCount = await this.getComment(res.id);

    return {
      ...post[0].serialize(),
      isLikedByUser: isLiked,
      likeCount: likeCount,
      likers: likers,
      commentCount: commentCount
    };
  }
  public async updatePost(postId: number, content: string, userId: number) {
    await Post.query().where('id', postId).update({ content });
    const post = await Post.query().where('id', postId).firstOrFail();

    const isLiked = await this.TestLike(post.id, userId);
    const likeCount = await this.getLike(post.id);
    const likers = await this.showLikers(post.id);
    const commentCount = await this.getComment(post.id);

    return {
      ...post.serialize(),
      isLikedByUser: isLiked,
      likeCount: likeCount,
      likers: likers,
      commentCount: commentCount
    };
  }

  public async deletePost(postId: number) {
    return await Post.query().where('id', postId).delete()
  }
  public async getLike(postId: number) {
    const count = await Like.query().where('post_id', postId).count('* as total');
    return count[0].$extras.total;
  }
  public async getComment(postId: number) {
    const count = await Comment.query().where('post_id', postId).count('* as total');
    return count[0].$extras.total;
  }
  public async showLikers(postId: number) {
    const likes = await Like.query()
      .where('post_id', postId)
      .preload('user').limit(7).orderBy('postId', 'desc');
    const users = likes.map(like => like.user.username);
    return users;
  }
  public async showComments(postId: number) {
    return await Comment.query().where('postId', postId);
  }
  public async TestLike(postId: number, userId: number) {
    const res = await Like.findBy({ postId, userId });
    return res === null ? false : true;
  }
  public async AllPost(userId: number,page:number) {
    const posts = await Post.query()
      .orderBy('created_at', 'desc').preload('user')
      .paginate(page,15);

    const postsWithExtra = await Promise.all(posts.map(async (post) => {
      const isLiked = await this.TestLike(post.id, userId);
      const likeCount = await this.getLike(post.id);
      const likers = await this.showLikers(post.id);
      const commentCount = await this.getComment(post.id);
      return {
        ...post.serialize(),
        isLikedByUser: isLiked,
        likeCount: likeCount,
        likers: likers,
        commentCount: commentCount
      };
    }));

    return postsWithExtra;
  }
}