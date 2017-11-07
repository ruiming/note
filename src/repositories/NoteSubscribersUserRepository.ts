import 'reflect-metadata'
import { EntityRepository, Repository } from 'typeorm'
import { NoteSubscribersUser } from '../entities'

@EntityRepository(NoteSubscribersUser)
export class NoteSubscribersUserRepository extends Repository<NoteSubscribersUser> {
  getNoteSubscribersUser(id: number, noteId: number): Promise<NoteSubscribersUser | undefined> {
    return this.createQueryBuilder('note_subscribers_user')
      .where('note_subscribers_user.userId=:id', { id })
      .andWhere('note_subscribers_user.noteId=:noteId', { noteId })
      .getOne()
  }
}
