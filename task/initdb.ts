import * as process from 'process'
import { Test } from '../src/utils/Test'
import { database } from '../src/libraries/database'
;(async () => {
  await database()
  await Test.Instance.fetchCustomRepository()
  await Test.Instance.mockData()
  console.log('完成数据初始化')
  process.exit()
})().catch(() => {
  process.exit()
})
