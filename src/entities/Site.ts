import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { DeepPartial } from '../utils/DeepPartial'

@Entity()
export class Site {
  @PrimaryGeneratedColumn() id: number

  /** 标题 */
  @Column() title: string

  /** 网址 */
  @Column() link: string

  /** 图标 */
  @Column({ nullable: true })
  favicon?: string

  /** RSS */
  @Column({ nullable: true })
  feed?: string
}

export type PartialSite = DeepPartial<Site>
