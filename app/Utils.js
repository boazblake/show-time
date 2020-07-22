export const log = (m) => (v) => {
  console.log(m, v)
  return v
}

const secureImg = (url) =>
  url.match(/(https)./) ? url : url.replace("http", "https")

export const randomPause = () => Math.random() * 1000

export const nameFromRoute = (route) => route.split("/")[1].toUpperCase()
