import { SHA256 } from 'crypto-js'
import * as faker from 'faker'
import { IncomingMessage, ServerResponse } from 'http'
import { EntityManager, getConnection, getManager } from 'typeorm'
import * as entity from '../entities'
import * as repository from '../repositories'
import * as mock from './mock'

export class Test {
  private static instance: Test
  userRepository: repository.UserRepository
  noteRepository: repository.NoteRepository
  siteRepository: repository.SiteRepository
  noteSubscribersUserRepository: repository.NoteSubscribersUserRepository
  manager: EntityManager
  app: (req: IncomingMessage, res: ServerResponse) => void
  private constructor() {}
  destroy = async () => Promise.resolve()

  static get Instance(): Test {
    return this.instance || (this.instance = new this())
  }

  async close(): Promise<void> {
    await getConnection().close()
  }

  /**
   * 启动系统
   */
  async connect(): Promise<void> {
    const { connection } = await import('../index')
    this.app = await connection
    await this.fetchCustomRepository()
  }

  /**
   *  设置 customRepository
   */
  async fetchCustomRepository(): Promise<void> {
    this.manager = getManager()
    this.noteRepository = getConnection().getCustomRepository(repository.NoteRepository)
    this.siteRepository = getConnection().getCustomRepository(repository.SiteRepository)
    this.userRepository = getConnection().getCustomRepository(repository.UserRepository)
    this.noteSubscribersUserRepository = getConnection().getCustomRepository(repository.NoteSubscribersUserRepository)
  }

  /**
   * mock 数据
   */
  async mockData(): Promise<void> {
    const user = await this.userRepository.save(
      this.userRepository.create(
        mock.mockUser({
          name: 'test',
          password: SHA256('test').toString()
        })
      )
    )

    const siteUrls = [
      faker.internet.url(),
      faker.internet.url(),
      faker.internet.url(),
      faker.internet.url(),
      faker.internet.url(),
      faker.internet.url(),
      faker.internet.url(),
      faker.internet.url(),
      faker.internet.url(),
      faker.internet.url(),
      faker.internet.url(),
      faker.internet.url()
    ]

    const sites: entity.Site[] = []
    const notes: entity.Note[] = []
    const noteSubscribersUserItemList: entity.NoteSubscribersUser[] = []
    for (const siteUrl of siteUrls) {
      const siteGroup = await this.siteRepository.save(
        this.siteRepository.create([
          mock.mockSite({ link: siteUrl }),
          mock.mockSite({ link: siteUrl }),
          mock.mockSite({ link: siteUrl }),
          mock.mockSite({ link: siteUrl }),
          mock.mockSite({ link: siteUrl }),
          mock.mockSite({ link: siteUrl }),
          mock.mockSite({ link: siteUrl }),
          mock.mockSite({ link: siteUrl }),
          mock.mockSite({ link: siteUrl }),
          mock.mockSite({ link: siteUrl }),
          mock.mockSite({ link: siteUrl }),
          mock.mockSite({ link: siteUrl })
        ])
      )
      for (const site of siteGroup) {
        sites.push(site)
        const noteGroup = await this.noteRepository.save(
          this.noteRepository.create([
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id }),
            mock.mockNote({ siteId: site.id })
          ])
        )
        for (const note of noteGroup) {
          notes.push(note)
          const item = await this.noteSubscribersUserRepository.save(
            this.noteSubscribersUserRepository.create({
              note,
              user,
              isRead: faker.random.boolean(),
              isMark: faker.random.boolean()
            })
          )
          noteSubscribersUserItemList.push(item)
        }
      }
    }
    this.destroy = async () => {
      await this.noteSubscribersUserRepository.remove(noteSubscribersUserItemList)
      await this.noteRepository.remove(notes)
      await this.siteRepository.remove(sites)
      await this.userRepository.remove(user)
    }
  }
}
