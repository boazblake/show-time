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

export const slideOutLeft = [
  {
    transform: "translate3d(0, 0, 0)",
  },
  {
    visibility: "hidden",
    transform: "translate3d(100%, 0, 0)",
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

export const shake = [
  {
    "-webkit-transform": "rotate(-15deg)",
    offset: 0.0,
    transform: "rotate(-15deg)",
  },
  {
    "-webkit-transform": "rotate(15deg)",
    offset: 0.2,
    transform: "rotate(15deg)",
  },
  {
    "-webkit-transform": "rotate(-18deg)",
    offset: 0.4,
    transform: "rotate(-18deg)",
  },
  {
    "-webkit-transform": "rotate(18deg)",
    offset: 0.6,
    transform: "rotate(18deg)",
  },
  {
    "-webkit-transform": "rotate(-22deg)",
    offset: 0.8,
    transform: "rotate(-22deg)",
  },
]

export const puffOutCenter = [
  {
    "-webkit-transform": "scale(1)",
    transform: "scale(1)",
    filter: "blur(0)",
    opacity: 1,
  },
  {
    "-webkit-transform": "scale(2)",
    transform: "scale(2)",
    filter: "blur(4px)",
    opacity: 0,
  },
]

export const shutterInTop = [
  {
    "-webkit-transform": "rotateX(-100deg)",
    transform: " rotateX(-100deg)",
    "-webkit-transform-origin": "top",
    "transform-origin": "top",
    opacity: 0,
  },
  {
    "-webkit-transform": " rotateX(0deg)",
    transform: " rotateX(0deg)",
    "-webkit-transform-origin": "top",
    "transform-origin": "top",
    opacity: 1,
  },
]

export const shutterOutTop = [
  {
    "-webkit-transform": "rotateX(0deg)",
    transform: " rotateX(0deg)",
    "-webkit-transform-origin": "top",
    "transform-origin": "top",
    opacity: 1,
  },
  {
    "-webkit-transform": " rotateX(70deg)",
    transform: " rotateX(70deg)",
    "-webkit-transform-origin": "top",
    "transform-origin": "top",
    opacity: 0,
  },
]

export const shutterOutBottom = [
  {
    "-webkit-transform": "rotateX(0deg)",
    transform: " rotateX(0deg)",
    "-webkit-transform-origin": "bottom",
    "transform-origin": "bottom",
    opacity: 1,
  },
  {
    "-webkit-transform": " rotateX(-70deg)",
    transform: " rotateX(-70deg)",
    "-webkit-transform-origin": "bottom",
    "transform-origin": "bottom",
    opacity: 0,
  },
]

export const shutterInBottom = [
  {
    "-webkit-transform": "rotateX(100deg)",
    transform: " rotateX(100deg)",
    "-webkit-transform-origin": "bottom",
    "transform-origin": "bottom",
    opacity: 0,
  },
  {
    "-webkit-transform": " rotateX(0deg)",
    transform: " rotateX(0deg)",
    "-webkit-transform-origin": "bottom",
    "transform-origin": "bottom",
    opacity: 1,
  },
]

export const shutterInLeft = [
  {
    "-webkit-transform": "rotateY(100deg)",
    transform: " rotateY(100deg)",
    "-webkit-transform-origin": "left",
    "transform-origin": "left",
    opacity: 0,
  },
  {
    "-webkit-transform": " rotateY(0deg)",
    transform: " rotateY(0deg)",
    "-webkit-transform-origin": "left",
    "transform-origin": "left",
    opacity: 1,
  },
]

export const shutterOutLeft = [
  {
    "-webkit-transform": "rotateY(0deg)",
    transform: " rotateY(0deg)",
    "-webkit-transform-origin": "left",
    "transform-origin": "left",
    opacity: 1,
  },
  {
    "-webkit-transform": " rotateY(-70deg)",
    transform: " rotateY(-70deg)",
    "-webkit-transform-origin": "left",
    "transform-origin": "left",
    opacity: 0,
  },
]

export const shutterInRight = [
  {
    "-webkit-transform": "rotateY(-100deg)",
    transform: " rotateY(-100deg)",
    "-webkit-transform-origin": "right",
    "transform-origin": "right",
    opacity: 0,
  },
  {
    "-webkit-transform": " rotateY(0deg)",
    transform: " rotateY(0deg)",
    "-webkit-transform-origin": "right",
    "transform-origin": "right",
    opacity: 1,
  },
]

export const shutterOutRight = [
  {
    "-webkit-transform": "rotateY(0deg)",
    transform: " rotateY(0deg)",
    "-webkit-transform-origin": "right",
    "transform-origin": "right",
    opacity: 1,
  },
  {
    "-webkit-transform": " rotateY(70deg)",
    transform: " rotateY(70deg)",
    "-webkit-transform-origin": "right",
    "transform-origin": "right",
    opacity: 0,
  },
]

export const focusInContract = [
  {
    filter: "blur(12px)",
    opacity: 0,
  },
  {
    filter: "blur(0)",
    opacity: 1,
  },
]
