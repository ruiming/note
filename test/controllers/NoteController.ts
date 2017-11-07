import * as assert from 'power-assert'
import * as request from 'supertest'
import { Test } from '../../src/utils/Test'

describe('NoteController', () => {
  it('获取用户的所有笔记', async () => {
    const res = await request(Test.Instance.app).get('/v1/notes')

    assert(res.body.length === 20)
  })

  it('获取一篇笔记的信息', async () => {
    const note = await Test.Instance.noteRepository.findOne()
    const res = await request(Test.Instance.app).get(`/v1/notes/${note!.id}`)

    assert(res.status === 200)
  })

  it('删除笔记', async () => {
    const note = await Test.Instance.noteSubscribersUserRepository.findOne()
    const res = await request(Test.Instance.app).delete(`/v1/notes/${note!.noteId}`)

    assert(res.status === 200)
  })

  it('更新笔记', async () => {
    const note = await Test.Instance.noteRepository.findOne()
    await request(Test.Instance.app)
      .patch(`/v1/notes/${note!.id}`)
      .send({
        tags: ['123', '456']
      })

    const res = await Test.Instance.noteRepository.findOneById(note!.id)
    assert(res!.tags[1] === '456')
  })

  it('创建笔记', async () => {
    const res = await request(Test.Instance.app)
      .post('/v1/notes')
      .send({
        url: 'https://www.google.com'
      })

    assert(res.body === true)
  })
})
