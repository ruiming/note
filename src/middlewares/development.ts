import { Context } from 'koa'
import { getConnection } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'

export function development(): (ctx: Context, next: () => Promise<{}>) => Promise<void> {
  return async (ctx: Context, next: () => Promise<{}>): Promise<void> => {
    const userRepository = getConnection().getCustomRepository(UserRepository)
    const user = await userRepository.findOne()
    ctx.state = {
      id: user!.id
    }
    await next()
  }
}
