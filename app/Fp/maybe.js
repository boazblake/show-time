import M from 'data.maybe'
import Task from 'data.task'
import { value } from './util'

const configure = (_) => {
  const _toTask = function(nothing) {
    const cata = {
      Nothing: (_) => Task.of(nothing),
      Just: (x) => Task.of(x),
    }
    return this.cata(cata)
  }

  Object.defineProperty(M.prototype, 'toTask', value(_toTask))
}
export const Maybe = { configure }
