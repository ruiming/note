import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { DeepPartial } from '../utils/DeepPartial'
import { User } from './User'

@Entity()
export class Setting {
  @PrimaryGeneratedColumn() id: number

  @Column() userId: number

  @OneToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User
}

export type PartialSetting = DeepPartial<Setting>
