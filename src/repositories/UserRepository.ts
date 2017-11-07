import { SHA512 } from 'crypto-js'
import 'reflect-metadata'
import { BadRequestError } from 'routing-controllers'
import { EntityRepository, Repository } from 'typeorm'
import { User } from '../entities'
import { LoginInterface, RegisterInterface } from '../interfaces'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(body: RegisterInterface): Promise<User> {
    const user = await this.findOne({ email: body.email })

    if (user) {
      throw new BadRequestError('邮箱已被注册')
    }

    return this.save(
      this.create({
        name: body.name,
        email: body.email,
        password: SHA512(body.password).toString()
      })
    )
  }

  async getUser(body: LoginInterface): Promise<User> {
    const user = await this.findOne({
      email: body.email,
      password: SHA512(body.password).toString()
    })

    if (!user) {
      throw new BadRequestError('用户不存在或密码错误')
    }

    return user
  }
}
