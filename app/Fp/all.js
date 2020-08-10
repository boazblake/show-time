export const All = x => ({
  val: x,
  concat: ({ val }) => All(x && val),
})

All.empty = All(true)
