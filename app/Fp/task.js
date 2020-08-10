import T from 'data.task'
import { value } from './util'

const configure = () => {
  const _mjoin = function() {
    return new T((rej, res) => this.fork(rej, (s) => s.fork(rej, res)))
  }

  Object.defineProperty(T.prototype, 'mjoin', value(_mjoin))
}

export const Task = { configure }
