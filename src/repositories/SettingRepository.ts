import 'reflect-metadata'
import { EntityRepository, Repository } from 'typeorm'
import { Setting } from '../entities'

@EntityRepository(Setting)
export class SettingRepository extends Repository<Setting> {}
