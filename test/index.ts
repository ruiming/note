import 'mocha'
import '../src/utils/config'
import { Test } from '../src/utils/Test'

before('before all', async () => {
  await Test.Instance.connect()
})

after('after all', async () => {
  await Test.Instance.close()
})
