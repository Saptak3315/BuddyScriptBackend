// app/Models/Reply.ts
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'
import User from './user.js'

export default class Reply extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare commentId: number

  @column()
  declare text: string

  @column()
  declare createdAt: number

  @column()
  declare userId: number

  @belongsTo(() => Comment)
  declare comment: BelongsTo<typeof Comment>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
