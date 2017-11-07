import * as faker from 'faker'
import * as assert from 'power-assert'
import * as request from 'supertest'
import { Test } from '../../src/utils/Test'

const name = faker.name.firstName()
const email = faker.internet.email()
const password = faker.internet.password()

describe('UserController', () => {
  it('注册账号', async () => {
    const res = await request(Test.Instance.app)
      .post('/v1/user/register')
      .send({
        name,
        email,
        password
      })

    assert(res.body.email === email && res.body.name && res.body.id && !res.body.password)
    assert(/^\["authorization=Bearer\s[\w\W]+/.test(JSON.stringify(res.header['set-cookie'])))
  })

  it('登录账号', async () => {
    const res = await request(Test.Instance.app)
      .post('/v1/user/login')
      .send({
        email,
        password
      })

    assert(res.body.email === email && res.body.name && res.body.id && !res.body.password)
    assert(/^\["authorization=Bearer\s[\w\W]+/.test(JSON.stringify(res.header['set-cookie'])))
  })
})
