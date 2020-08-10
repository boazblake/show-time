import { tagged } from 'daggy'
import { compose, identity } from 'ramda'

const Coyoneda = tagged('x', 'f')

Coyoneda.prototype.map = function(f) {
  return Coyoneda(
    this.x,
    compose(
      f,
      this.f
    )
  )
}

Coyoneda.prototype.lower = function() {
  return this.x.map(this.f)
}

Coyoneda.lift = (x) => Coyoneda(x, identity)

export { Coyoneda }
