import { Context } from 'koa'
import { Body, Ctx, JsonController, Param, Patch, Post } from 'routing-controllers'
import { Inject, Service } from 'typedi'
import { User } from '../entities'
import { LoginInterface, RegisterInterface } from '../interfaces'
import { UserService } from '../services'
import { activeUserSession } from '../utils/userSession'

@Service()
@JsonController('/user')
export class UserController {
  @Inject() userService: UserService

  /**
   * 注册账号
   */
  @Post('/register')
  async register(@Ctx() ctx: Context, @Body() body: RegisterInterface): Promise<User> {
    const user = await this.userService.createUser(body)

    activeUserSession(user, ctx)

    return user
  }

  /**
   * 登录账号
   */
  @Post('/login')
  async login(@Ctx() ctx: Context, @Body() body: LoginInterface): Promise<User> {
    const user = await this.userService.getUser(body)

    activeUserSession(user, ctx)

    return user
  }

  /**
   * 完善用户资料
   */
  @Patch('/:uid')
  async update(@Param('uid') uid: number) {
    // todo
  }
}
