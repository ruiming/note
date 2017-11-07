import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Note } from './Note'
import { User } from './User'

@Entity()
@Index(['user'])
@Index(['note'])
export class NoteSubscribersUser {
  @PrimaryColumn() noteId: number

  @PrimaryColumn() userId: number

  /** 是否已读 */
  @Column() isRead: boolean

  /** 是否已经收藏 */
  @Column() isMark: boolean

  @ManyToOne(type => Note)
  @JoinColumn({ name: 'noteId' })
  note: Note

  @ManyToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User
}
