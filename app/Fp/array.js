import { value } from "./util"

const _flatten = (xs) => xs.reduce((a, b) => a.concat(b), [])

const configure = (_) => {
  const _fmap = function (f) {
    const xs = this
    return xs.map((x) => f(x)) //avoid index
  }

  Object.defineProperty(Array.prototype, "fmap", value(_fmap))

  const _empty = (_) => []

  Object.defineProperty(Array.prototype, "empty", value(_empty))

  const _chain = function (f) {
    return _flatten(this.fmap(f))
  }

  Object.defineProperty(Array.prototype, "chain", value(_chain))

  const _of = (x) => [x]

  Object.defineProperty(Array.prototype, "of", value(_of))

  const _ap = function (a2) {
    return _flatten(this.map((f) => a2.map((a) => f(a))))
  }

  Object.defineProperty(Array.prototype, "ap", value(_ap))

  const _traverse = function (f, point) {
    const cons_f = (ys, x) =>
      f(x)
        .map((x) => (y) => y.concat(x))
        .ap(ys)

    return this.reduce(cons_f, point([]))
  }

  Object.defineProperty(Array.prototype, "traverse", value(_traverse))

  const _any = function () {
    return this.length > 0
  }

  Object.defineProperty(Array.prototype, "any", value(_any))

  const _insertAt = function (idx, x) {
    return this.splice(idx, 0, x)
  }

  Object.defineProperty(Array.prototype, "insertAt", value(_insertAt))

  const _removeAt = function (idx) {
    return this.splice(idx, 1)
  }

  Object.defineProperty(Array.prototype, "removeAt", value(_removeAt))

  const _last = function () {
    return this[this.length - 1]
  }

  Object.defineProperty(Array.prototype, "last", value(_last))

  const _in = function (comparer) {
    for (var i = 0; i < this.length; i++) {
      if (comparer(this[i])) return true
    }
    return false
  }

  Object.defineProperty(Array.prototype, "in", value(_in))

  const _pushIfNotExist = function (element, comparer) {
    if (!this.in(comparer)) {
      this.push(element)
    }
  }

  Object.defineProperty(
    Array.prototype,
    "pushIfNotExist",
    value(_pushIfNotExist)
  )

  const _foldM = function (point, f) {
    const go = (a) => (!this.any() ? point(a) : f(a, this.shift()).chain(go))
    return go
  }

  Object.defineProperty(Array.prototype, "foldM", value(_foldM))
}

export const ArrayFP = { configure }
