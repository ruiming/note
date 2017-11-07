import * as config from 'config'
import { MD5 } from 'crypto-js'
import { sign } from 'jsonwebtoken'
import { Context } from 'koa'
import * as uuid from 'uuid'

const jwtConfig = config.jwt

export function activeUserSession(
  body: {},
  ctx?: Context
): {
  token: string
  xsrfToken: string
} {
  const xsrfToken = MD5(uuid()).toString()
  const token = sign(
    {
      ...body,
      xsrfToken
    },
    jwtConfig.secret,
    {
      expiresIn: config.jwt.exp
    }
  )

  if (ctx) {
    ctx.cookies.set('authorization', `Bearer ${token}`, {
      expires: new Date(Date.now() + config.jwt.exp),
      overwrite: true,
      httpOnly: true
    })
    ctx.cookies.set('xsrf-token', xsrfToken, {
      expires: new Date(Date.now() + config.jwt.exp),
      overwrite: true
    })
  }

  return {
    token,
    xsrfToken
  }
}
