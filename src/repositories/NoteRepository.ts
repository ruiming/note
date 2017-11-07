import 'reflect-metadata'
import { EntityRepository, Repository } from 'typeorm'
import { Note } from '../entities'
import { NoteQueryInterface } from '../interfaces/NoteInterface'

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {
  getNoteList(query: NoteQueryInterface): Promise<Note[]> {
    return this.createQueryBuilder('note')
      .offset(query.offset)
      .limit(query.limit)
      .getMany()
  }
}
