import { jsonCopy } from "Utils"

function transitionEndPromise(element) {
  return new Promise((resolve) => {
    element.addEventListener("transitionend", function f() {
      if (event.target !== element) return
      element.removeEventListener("transitionend", f)
      resolve()
    })
  })
}

function requestAnimationFramePromise() {
  return new Promise((resolve) => requestAnimationFrame(resolve))
}

export function animate(element, stylz) {
  Object.assign(element.style, stylz)
  return transitionEndPromise(element).then((_) =>
    requestAnimationFramePromise()
  )
}

export const animatePageCSS = ([animation, pause], prefix = "animate__") => ({
  dom,
}) =>
  new Promise((resolve) => {
    let cs = [...dom.classList].filter((c) => !c.includes("animate__"))
    dom.classList = cs
    dom.classList.add(`${prefix}animated`, `${prefix}${animation}`)
    let origStyles = jsonCopy(dom.style)
    dom.style.position = "absolute"
    dom.style.top = -19
    dom.style.width = "100%"

    setTimeout(() => {
      return transitionEndPromise(dom).then((_) => {
        dom.style = origStyles
        requestAnimationFramePromise()
      })
    }, pause())
  })

export const animateCSS = ([animation, pause], prefix = "animate__") => ({
  dom,
}) =>
  new Promise((resolve) => {
    let cs = [...dom.classList].filter((c) => !c.includes("animate__"))
    dom.classList = cs
    dom.classList.add(`${prefix}animated`, `${prefix}${animation}`)

    setTimeout(() => {
      return transitionEndPromise(dom).then((_) =>
        requestAnimationFramePromise()
      )
    }, pause())
  })

export const animateChildrenIn = ([animation, parentPause, childPause]) => ({
  dom,
}) => {
  let children = [...dom.children]

  return children.map((child, idx) => {
    child.style.opacity = 0
    setTimeout(() => {
      child.style.opacity = 1
      return animateCSS([animation, parentPause])({ dom: child })
    }, childPause())
  })
}

export const animateChildrenOut = ([animation, parentPause, childPause]) => ({
  dom,
}) => {
  let children = [...dom.children]
  console.log(children)
  return children.map((child, idx) => {
    child.style.opacity = 0
    console.log("huh??", animateCSS([animation, parentPause])({ dom: child }))
    setTimeout(() => {
      child.style.opacity = 1
      return animateCSS([animation, parentPause])({ dom: child }).then((x) => {
        return animateCSS([animation, parentPause])({ dom })
      })
    }, childPause())
  })
}

export const AnimateSideBarIn = ([animation, parentPause, childPause]) => ({
  dom,
}) => animateChildrenIn([animation, parentPause, childPause])({ dom })

export const AnimateSideBarOut = ([animation, parentPause, childPause]) => ({
  dom,
}) => animateChildrenOut([animation, parentPause, childPause])({ dom })

export const AnimateNavBar = ([animation, parentPause, childPause]) => ({
  dom,
}) => animateChildrenIn([animation, parentPause, childPause])({ dom })
