import { Service } from 'typedi'
import { getConnection } from 'typeorm'
import { User } from '../entities'
import { LoginInterface, RegisterInterface } from '../interfaces'
import { UserRepository } from '../repositories/UserRepository'

@Service()
export class UserService {
  userRepository: UserRepository

  constructor() {
    this.userRepository = getConnection().getCustomRepository(UserRepository)
  }

  async createUser(body: RegisterInterface): Promise<User> {
    return this.userRepository.createUser(body)
  }

  async getUser(body: LoginInterface): Promise<User> {
    return this.userRepository.getUser(body)
  }
}
