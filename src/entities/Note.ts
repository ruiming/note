import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { NoteSubscribersUser } from '../entities/Note_Subscribers_User'
import { DeepPartial } from '../utils/DeepPartial'
import { Site } from './Site'

@Entity()
export class Note {
  @PrimaryGeneratedColumn() id: number

  /** 标题 */
  @Column() title: string

  /** 链接 */
  @Column() url: string

  /** 网站 ID */
  @Column() siteId: number

  /** 简介 */
  @Column() summary: string

  /** 内容 */
  @Column('text') description: string

  /** 标签 */
  @Column({
    type: 'json',
    nullable: true
  })
  tags: string[]

  /** 创建时间 */
  @CreateDateColumn() createdAt: string

  /** 更新时间 */
  @UpdateDateColumn() updatedAt: string

  /** 笔记订阅者 */
  @OneToMany(type => NoteSubscribersUser, item => item.note)
  subscribers: NoteSubscribersUser[]

  /** 网站 */
  @OneToOne(type => Site)
  @JoinColumn({ name: 'siteId' })
  site: Site
}

export type PartialNote = DeepPartial<Note>
