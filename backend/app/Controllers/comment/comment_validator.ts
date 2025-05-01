import vine from "@vinejs/vine";
export const commentValidate=vine.compile(
    vine.object({
        postId:vine.number(),
        text:vine.string(),
        userId:vine.number()
    })
)
export const ReplyValidate=vine.compile(
    vine.object({
        commentId:vine.number()
    })
)
export const ShowComment=vine.compile(
    vine.object({
        postId:vine.number(),
        page:vine.number()
}))