import { IsArray, IsUrl } from 'class-validator'
import { IsNumber } from '../validations/IsNumber'

/**
 * 查询笔记的筛选条件
 */
export class NoteQueryInterface {
  @IsNumber() limit: number = 20
  @IsNumber() offset: number = 0
  @IsArray() tags: string[] = []
}

/**
 * 更新笔记的内容
 */
export class NoteUpdateInterface {
  @IsArray() tags: string[] = []
}

/**
 * 创建笔记接口
 */
export class NoteCreateInterface {
  @IsUrl() url: string
}
