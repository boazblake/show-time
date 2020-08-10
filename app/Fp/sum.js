export const Sum = x => ({
  x,
  concat: ({ x: y }) => x + y,
  inspect: `Sum(${x})`,
})
