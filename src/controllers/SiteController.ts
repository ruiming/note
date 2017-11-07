import { Get, JsonController, QueryParams } from 'routing-controllers'
import { Inject, Service } from 'typedi'
import { Site } from '../entities'
import { SiteQueryInterface } from '../interfaces'
import { SiteService } from '../services'

@Service()
@JsonController('/sites')
export class SiteController {
  @Inject() siteService: SiteService

  /**
   * 获取用户收藏的所有归属网站
   */
  @Get('/')
  async getSiteList(@QueryParams() params: SiteQueryInterface): Promise<Site[]> {
    return this.siteService.getSiteList(params)
  }
}
