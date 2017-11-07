import * as config from 'config'
import * as Redis from 'ioredis'

const cacheConfig = config.cache

export class Cache extends Redis {
  constructor() {
    super(cacheConfig.port, cacheConfig.host, {
      password: cacheConfig.password,
      db: cacheConfig.db
    })
  }
}

export const cache = new Cache()

cache.on('connect', () => console.log('[REDIS] Redis Connected'))
cache.on('disconnect', () => console.log('[REDIS] Redis Disconnected'))
cache.on('error', (e: Error) => console.log('[REDIS] Redis Error', e))
