import vine from "@vinejs/vine";
export const likeValidate=vine.compile(
    vine.object({
        postId:vine.number(),
        userId:vine.number(),
    })
)