import 'reflect-metadata'
import { EntityRepository, Repository } from 'typeorm'
import { Site } from '../entities'
import { SiteQueryInterface } from '../interfaces'

@EntityRepository(Site)
export class SiteRepository extends Repository<Site> {
  async getSiteList(params: SiteQueryInterface): Promise<Site[]> {
    const siteList = await this.createQueryBuilder('site')
      .limit(params.limit)
      .offset(params.offset)
      .getMany()
    return siteList
  }
}
