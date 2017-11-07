import { BadRequestError } from 'routing-controllers'
import { Service } from 'typedi'
import { getConnection } from 'typeorm'
import { Note } from '../entities'
import { NoteQueryInterface, NoteUpdateInterface } from '../interfaces/NoteInterface'
import { NoteRepository } from '../repositories'

@Service()
export class NoteService {
  noteRepository: NoteRepository

  constructor() {
    this.noteRepository = getConnection().getCustomRepository(NoteRepository)
  }

  async getNoteList(query: NoteQueryInterface): Promise<Note[]> {
    return this.noteRepository.getNoteList(query)
  }

  async getNote(noteId: number): Promise<Note> {
    const note = await this.noteRepository.findOneById(noteId)
    if (!note) {
      throw new BadRequestError(`note ${noteId} dont exist`)
    }

    return note
  }

  async updateNote(noteId: number, body: NoteUpdateInterface): Promise<void> {
    const note = await this.noteRepository.findOneById(noteId)
    if (!note) {
      throw new BadRequestError(`note ${noteId} dont exist`)
    }
    note.tags = body.tags
    await this.noteRepository.save(note)
  }
}
