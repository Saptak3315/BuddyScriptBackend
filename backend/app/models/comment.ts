// app/Models/Comment.ts
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Post from './post.js'
import Reply from './reply.js'
import User from './user.js'
import { DateTime } from 'luxon'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare postId: number

  @column()
  declare text: string

  @column()
  declare userId: number

  @column.dateTime({autoCreate:true})
  declare createdAt: DateTime

  @belongsTo(() => Post)
  declare post: BelongsTo<typeof Post>

  @hasMany(() => Reply)
  declare replies: HasMany<typeof Reply>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

}
