import { Body, Delete, Get, JsonController, Param, Patch, Post, QueryParams, State } from 'routing-controllers'
import { Inject, Service } from 'typedi'
import { Note } from '../entities'
import { NoteCreateInterface, NoteQueryInterface, NoteUpdateInterface } from '../interfaces/NoteInterface'
import { NoteService, NoteSubscribersUserService } from '../services'

@Service()
@JsonController('/notes')
export class NoteController {
  /**
   * 获取用户的所有笔记
   */
  @Inject() noteService: NoteService

  @Inject() noteSubscribersUserService: NoteSubscribersUserService

  @Get('/')
  async getNoteList(@QueryParams() query: NoteQueryInterface): Promise<Note[]> {
    return this.noteService.getNoteList(query)
  }

  /**
   * 获取一篇笔记的信息
   */
  @Get('/:noteId')
  async getNote(@Param('noteId') noteId: number): Promise<Note> {
    return this.noteService.getNote(noteId)
  }

  /**
   * 删除笔记
   */
  @Delete('/:noteId')
  async deleteNote(@State('id') id: number, @Param('noteId') noteId: number): Promise<boolean> {
    await this.noteSubscribersUserService.deleteNoteSubscribersUser(id, noteId)
    return true
  }

  /**
   * 更新笔记
   */
  @Patch('/:noteId')
  async updateNote(@Param('noteId') noteId: number, @Body() body: NoteUpdateInterface): Promise<boolean> {
    await this.noteService.updateNote(noteId, body)
    return true
  }

  /**
   * 创建笔记
   */
  @Post('/')
  async createNote(@Body() body: NoteCreateInterface) {
    return true
  }
}
