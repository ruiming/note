import { BadRequestError } from 'routing-controllers'
import { Service } from 'typedi'
import { getConnection } from 'typeorm'
import { NoteSubscribersUserRepository } from '../repositories'

@Service()
export class NoteSubscribersUserService {
  noteSubscribersUserRepository: NoteSubscribersUserRepository

  constructor() {
    this.noteSubscribersUserRepository = getConnection().getCustomRepository(NoteSubscribersUserRepository)
  }

  async deleteNoteSubscribersUser(id: number, noteId: number): Promise<void> {
    const data = await this.noteSubscribersUserRepository.getNoteSubscribersUser(id, noteId)
    if (!data) {
      throw new BadRequestError(`User ${id} dont subscribe note ${noteId}`)
    }
    await this.noteSubscribersUserRepository.remove(data)
  }
}
