import V from 'data.validation'
import T from 'data.task'
import { value } from './util'

const constant = (x) => () => x

const id = (x) => x

const configure = () => {
  const apLeft = function(b) {
    return this.map(constant).ap(b)
  }

  Object.defineProperty(V.prototype, 'apLeft', value(apLeft))

  const apRight = function(b) {
    return this.map(constant(id)).ap(b)
  }

  Object.defineProperty(V.prototype, 'apRight', value(apRight))

  const _toTask = function() {
    const f = {
      Failure: (x) => T.rejected(x),
      Success: (x) => T.of(x),
    }

    return this.cata(f)
  }

  Object.defineProperty(V.prototype, 'toTask', value(_toTask))
}

export const Validation = { configure }
