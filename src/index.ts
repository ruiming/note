import 'reflect-metadata'
import * as config from 'config'
import { IncomingMessage, ServerResponse } from 'http'
import * as Koa from 'koa'
import * as jwt from 'koa-jwt'
import * as logger from 'koa-logger'
import * as Raven from 'raven'
import { useContainer as useContainerForRoute, useKoaServer } from 'routing-controllers'
import { Container } from 'typedi'
import { useContainer as useContainerForOrm } from 'typeorm'
import { database } from './libraries/database'
import { development } from './middlewares/development'
import { transformer } from './middlewares/transformer'
import './utils/config'

const jwtConfig = config.jwt
const port = config.port

useContainerForRoute(Container)
useContainerForOrm(Container)

const app = new Koa()

app.use(logger())
app.use(transformer())

if (process.env.NODE_ENV === 'production') {
  app.use(
    jwt({
      secret: jwtConfig.secret,
      cookie: 'authorization'
    }).unless({
      path: [/^\/v1\/user\/[login|register]/]
    })
  )
} else {
  app.use(development())
}

useKoaServer(app, {
  cors: true,
  routePrefix: '/v1',
  controllers: [`${__dirname}/controllers/*{js,ts}`],
  defaultErrorHandler: false
})

export const connection = database().then(async c => {
  return new Promise<(req: IncomingMessage, res: ServerResponse) => void>(resolve => {
    app.listen(port, () => {
      console.log(`[APP] Listen on ${port} in ${config.env} enviroment`)
      resolve(app.callback())
    })
  })
})

// 错误处理
/* istanbul ignore if  */
if (process.env.NODE_ENV === 'production') {
  Raven.config(config.sentry.uri).install()
  app.on('error', (err: Error) => {
    Raven.captureException(err, (_: Error, eventId) => {
      console.log('Reported error ', eventId)
    })
  })
  process.on('uncaughtException', (err: Error) => {
    Raven.captureException(err, (_: Error, eventId) => {
      console.log('Reported error ', eventId)
      process.exit(1)
    })
  })
}
