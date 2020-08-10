// Intersection Semigroup.
//
// The intersection (based on value equality) of two lists
// Intersection :: (Eq m) <= m -> Intersection m
export const Intersection = xs => ({
  xs,
  concat: ({ xs: ys }) =>
    Intersection(xs.filter(x => ys.some(y => y.equals(x)))),
  inspect: `Intersection(${xs})`,
})
