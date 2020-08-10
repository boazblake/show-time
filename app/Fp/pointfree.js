import { chain, curry, compose, concat, map, prop } from 'ramda'
import Either from 'data.either'
import Task from 'data.task'

export class ParseError extends Error {}

const id = (x) => x

const _groupsOf = curry((n, xs) =>
  !xs.length ? [] : [xs.slice(0, n)].concat(_groupsOf(n, xs.slice(n, length)))
)

export const mjoin = (mmv) => {
  if (mmv.mjoin) return mmv.mjoin()
  return chain(id, mmv)
}

export const mconcat = curry((xs, empty) =>
  xs.length ? xs.reduce(concat) : empty()
)

export const sequenceA = curry((point, fctr) => {
  return fctr.traverse(id, point)
})

export const of = (x) => x.of

export const traverse = curry((f, point, fctr) =>
  compose(
    sequenceA(point),
    map(f)
  )(fctr)
)

export const foldMap = curry((f, fldable) =>
  fldable.reduce((acc, x) => {
    const r = f(x)
    acc = acc || r.empty()
    return acc.concat(r)
  }, null)
)

export const fold = curry((f, g, x) => x.fold(f, g))

export const toList = (x) => x.reduce((acc, y) => [y].concat(acc), [])

export const eitherToTask = (x) =>
  x.cata({
    Left: (e) => Task.rejected(new ParseError(e)),
    Right: (x) => Task.of(x),
  })

export const promiseToTask = (p) => new Task((rej, res) => p.then(res, rej))
export const taskToPromise = (t) => new Promise((res, rej) => t.fork(rej, res))

export const parse = Either.try(
  compose(
    JSON.parse,
    prop('response')
  )
)
