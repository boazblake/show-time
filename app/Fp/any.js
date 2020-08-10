export const Any = x => ({
  val: x,
  concat: ({ val }) => Any(x || val),
})

Any.empty = Any(false)
