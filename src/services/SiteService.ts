import { Service } from 'typedi'
import { getConnection } from 'typeorm'
import { Site } from '../entities'
import { SiteQueryInterface } from '../interfaces'
import { SiteRepository } from '../repositories'

@Service()
export class SiteService {
  siteRepository: SiteRepository

  constructor() {
    this.siteRepository = getConnection().getCustomRepository(SiteRepository)
  }

  async getSiteList(params: SiteQueryInterface): Promise<Site[]> {
    return this.siteRepository.getSiteList(params)
  }
}
