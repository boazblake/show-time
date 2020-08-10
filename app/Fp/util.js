export const value = f => {
  const x = {
    value: f,
    writable: true,
    configurable: true,
    enumerable: false,
  }

  return x
}
