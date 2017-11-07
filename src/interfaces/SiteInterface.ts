import { IsNumber } from '../validations/IsNumber'

export class SiteQueryInterface {
  @IsNumber() limit: number = 20
  @IsNumber() offset: number = 0
}
