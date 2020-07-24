import { jsonCopy } from "Utils"
export * from "./animations.js"

const duration = {
  duration: 700,
  easing: "ease-in-out",
  fill: "forwards",
}

function transitionEndPromise(element) {
  return new Promise((resolve) => {
    element.addEventListener("transitionend", function f() {
      if (event.target !== element) return
      element.removeEventListener("transitionend", f)
      return resolve()
    })
  })
}

export const AnimatePage = (animation) => ({ dom }) => {
  let origStyles = jsonCopy(dom.style)
  dom.style.position = "absolute"
  dom.style.top = -19
  dom.style.width = "100%"
  Animate(animation)({ dom }).then((res) => {
    return transitionEndPromise(dom).then((resolve) => {
      dom.style = origStyles
      return resolve
    })
  })
}

export const Animate = (animation) => ({ dom }) => {
  dom.animate(animation, duration)
  return transitionEndPromise(dom)
}

export const AnimateChildren = (animation, pause) => ({ dom }) => {
  let children = [...dom.children]

  return children.map((child, idx) => {
    child.style.opacity = 0
    setTimeout(() => {
      child.style.opacity = 1
      return Animate(animation)({ dom: child })
    }, pause())
  })
}