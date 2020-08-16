export const popIn = [
  {
    transform: "scale(0)",
    opacity: 1,
  },
  {
    transform: "scale(1)",
    opacity: 1,
  },
  {
    transform: "scale(0.8)",
    opacity: 1,
  },
  {
    transform: "scale(1)",
    opacity: 1,
  },
]

export const fadeIn = [
  {
    opacity: 0,
  },
  {
    opacity: 1,
  },
]

export const fadeOut = [
  {
    opacity: 1,
  },
  {
    opacity: 0,
  },
]

export const fadeInUp = [
  {
    opacity: 0,
    transform: "translate3d(0, 40%, 0)",
  },
  {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
  },
]

export const fadeInDown = [
  {
    opacity: 0,
    transform: "translate3d(0, 0, 0)",
  },
  {
    opacity: 1,
    transform: "translate3d(0, 10px, 0)",
  },
]
export const fadeOutUp = [
  {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
  },
  {
    opacity: 0,
    transform: "translate3d(0, -40%, 0)",
  },
]

export const fadeOutDown = [
  {
    opacity: 1,
    transform: "translate3d(0, -10px, 0)",
  },
  {
    opacity: 0,
    transform: "translate3d(0, 0, 0)",
  },
]

export const slideInRight = [
  {
    transform: "translate3d(-50%, 0, 0)",
  },
  {
    transform: "translate3d(0, 0, 0)",
    visibility: "visible",
  },
]

export const slideInLeft = [
  {
    transform: "translate3d(80%, 0, 0)",
    visibility: "visible",
  },
  {
    transform: "translate3d(0, 0, 0)",
  },
]

export const slideOutRight = [
  {
    transform: "translate3d(0, 0, 0)",
  },
  {
    visibility: "hidden",
    transform: "translate3d(100%, 0, 0)",
  },
]

export const slideOutUp = [
  {
    transform: "translate3d(0, 0, 0)",
  },
  {
    visibility: "hidden",
    transform: "translate3d(0, 10%, 0)",
  },
]

export const slideInDown = [
  {
    transform: "translate3d(0, -10%, 0)",
  },
  {
    transform: "translate3d(0, 0, 0)",
    visibility: "visible",
  },
]

// export const pulsate = {
//   "0%": {
//     transform: "scale(0.2)",
//     opacity: 0.8,
//   },

//   "80%": {
//     transform: "scale(1.2)",
//     opacity: 0,
//   },
//   "100%": {
//     transform: "scale(2.2)",
//     opacity: 0,
//   },
// }
