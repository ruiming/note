import { Exclude } from 'class-transformer'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { NoteSubscribersUser } from '../entities/Note_Subscribers_User'
import { DeepPartial } from '../utils/DeepPartial'

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number

  /** 邮箱 */
  @Column() email: string

  /** 用户名 */
  @Column() name: string

  /** 密码 */
  @Column()
  @Exclude()
  password: string

  /** 创建时间 */
  @CreateDateColumn() createdAt: string

  /** 更新时间 */
  @UpdateDateColumn() updatedAt: string

  /** 该用户订阅的笔记 */
  @OneToMany(type => NoteSubscribersUser, item => item.user)
  notes?: NoteSubscribersUser[]
}

export type PartialUser = DeepPartial<User>
