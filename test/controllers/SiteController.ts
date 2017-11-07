import * as assert from 'power-assert'
import * as request from 'supertest'
import { Test } from '../../src/utils/Test'

describe('SiteController', () => {
  it('获取用户收藏的所有归属网站', async () => {
    const res = await request(Test.Instance.app).get('/v1/sites')

    assert(res.status === 200)
    assert(Array.isArray(res.body))
  })
})
