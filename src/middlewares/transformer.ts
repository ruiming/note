import { ValidationError } from 'class-validator'
import { Context } from 'koa'
import { BadRequestError, InternalServerError } from 'routing-controllers'

// todo
export function transformer(): (ctx: Context, next: () => Promise<{}>) => Promise<void> {
  return async (ctx: Context, next: () => Promise<{}>) => {
    Reflect.setPrototypeOf(ctx.query, Object.prototype)
    try {
      await next()
    } catch (e) {
      let message
      if (Reflect.has(e, 'errors') && e.errors[0] instanceof ValidationError) {
        ctx.status = 400
        message = e.errors[0]
      } else if (e instanceof BadRequestError) {
        ctx.status = 400 // todo: 日志打印 500 错误
      } else if (e instanceof InternalServerError) {
        ctx.status = 500
        console.error('『捕获 InternalServerError 』\n', e)
      } else if (e.status === 401) {
        message = e.message
      } else {
        console.error('『程序异常 o(╥﹏╥)o』\n', e)
        throw e
      }
      ctx.status = ctx.status || e.httpCode || e.status || 500
      ctx.body = {
        message: message || e.message
      }
    }
  }
}
