import { tagged } from 'daggy'

export const Tuple = tagged('_1', '_2')
export const Tuple2 = Tuple
export const Tuple3 = tagged('_1', '_2', '_3')
export const Tuple4 = tagged('_1', '_2', '_3', '_4')
export const Tuple5 = tagged('_1', '_2', '_3', '_4', '_5')

// Methods
Tuple2.prototype.concat = function(b) {
  return Tuple2(this._1.concat(b._1), this._2.concat(b._2))
}
Tuple3.prototype.concat = function(b) {
  return Tuple3(
    this._1.concat(b._1),
    this._2.concat(b._2),
    this._3.concat(b._3)
  )
}
Tuple4.prototype.concat = function(b) {
  return Tuple4(
    this._1.concat(b._1),
    this._2.concat(b._2),
    this._3.concat(b._3),
    this._4.concat(b._4)
  )
}
Tuple5.prototype.concat = function(b) {
  return Tuple5(
    this._1.concat(b._1),
    this._2.concat(b._2),
    this._3.concat(b._3),
    this._4.concat(b._4),
    this._5.concat(b._5)
  )
}

// Methods
Tuple.prototype.dimap = function(f, g) {
  return Tuple(f(this._1), g(this._2))
}
Tuple.prototype.map = function(f) {
  return Tuple(this._1, f(this._2))
}
Tuple.prototype.curry = function(f) {
  return f(this)
}
Tuple.prototype.uncurry = function(f) {
  return f(this._1, this._2)
}
Tuple.prototype.extend = function(f) {
  return Tuple(this._1, f(this))
}
Tuple.prototype.extract = function() {
  return this._2
}
Tuple.prototype.foldl = function(f, z) {
  return f(this._2, z)
}
Tuple.prototype.foldr = function(f, z) {
  return f(z, this._2)
}
Tuple.prototype.foldMap = function(f, _) {
  return f(this._2)
}

export const tuple2 = Tuple
export const tuple3 = (a, b, c) => Tuple(tuple2(a, b), c)
export const tuple4 = (a, b, c, d) => Tuple(tuple3(a, b, c), d)
export const tuple5 = (a, b, c, d, e) => Tuple(tuple4(a, b, c, d), e)

export const curry2 = (f, a, b) => f(tuple2(a, b))
export const curry3 = (f, a, b, c) => f(tuple3(a, b, c))
export const curry4 = (f, a, b, c, d) => f(tuple4(a, b, c, d))
export const curry5 = (f, a, b, c, d, e) => f(tuple5(a, b, c, d, e))

export const uncurry2 = (f, t) => f(t._1, t._2)
export const uncurry3 = (f, t) => f(t._1._1, t._1._2, t._2)
export const uncurry4 = (f, t) => f(t._1._1._1, t._1._1._2, t._1._2, t._2)
export const uncurry5 = (f, t) =>
  f(t._1._1._1._1, t._1._1._1._2, t._1._1._2, t._1._2, t._2)
