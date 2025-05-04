import vine from "@vinejs/vine";
export const CreatePost = vine.compile(
    vine.object({
      content: vine.string(),
      userId: vine.number(),
    })
  )
  
  export const DeletePost = vine.compile(
    vine.object({
      postId: vine.number(),
    })
  )

  export const UpdatePost = vine.compile(
    vine.object({
      postId: vine.number(),
      content: vine.string(),
    })
  )
  export const getLike = vine.compile(
    vine.object({
      postId: vine.number(),
    })
  )
  export const getComment = vine.compile(
    vine.object({
      postId: vine.number(),
    })
  )
  export const showLikers = vine.compile(
    vine.object({
      postId: vine.number(),
    })
  )
  export const showComments= vine.compile(
    vine.object({
      postId: vine.number(),
    })
  )
  export const showallPost= vine.compile(
    vine.object({
      
    })
  )
  
  