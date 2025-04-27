import vine from '@vinejs/vine'

export const Validator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string(),
  })
)
