import * as Redlock from 'redlock'
import { cache } from './cache'

export const lock = (): Redlock => {
  return new Redlock([cache], {
    retryCount: 3,
    retryDelay: 200
  })
}
