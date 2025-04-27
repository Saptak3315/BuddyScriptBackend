import vine from "@vinejs/vine";
export const replyValidate=vine.compile(
    vine.object({
        commentId:vine.number(),
        text:vine.string(),
        createdAt:vine.number(),
        userId:vine.number(),
    })
)