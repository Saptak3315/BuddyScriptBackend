import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Post from './post.js'
import Like from './like.js'
import Comment from './comment.js'
import Reply from './reply.js'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'], //finding a user by a UID(username) and verifying their password before marking them as logged in.
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel,AuthFinder) {
  serializeExtras = true
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  @hasMany(() => Post, {
    foreignKey:'userId',
  })
  declare posts: HasMany<typeof Post>

  @hasMany(() => Like)
  declare likes: HasMany<typeof Like>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @hasMany(() => Reply)
  declare replies: HasMany<typeof Reply>
}
