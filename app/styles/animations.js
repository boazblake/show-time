export const animatePageCSS = (animation, prefix = "animate__") => ({ dom }) =>
  new Promise((resolve) => {
    let cs = [...dom.classList].filter((c) => !c.includes("animate__"))
    dom.classList = cs
    dom.classList.add(`${prefix}animated`, `${prefix}${animation}`)
    dom.style.position = "absolute"
    dom.style.top = -19
    dom.style.width = "100%"

    setTimeout(() => {
      dom.style.position = ""
      dom.style.top = ""
      resolve()
    }, 1000)
  })

export const animateCSS = (animation, prefix = "animate__") => ({ dom }) =>
  new Promise((resolve) => {
    let cs = [...dom.classList].filter((c) => !c.includes("animate__"))
    dom.classList = cs
    dom.classList.add(`${prefix}animated`, `${prefix}${animation}`)

    setTimeout(() => {
      resolve()
    }, 1000)
  })

export const SlideChildrenInRight = (animation) => ({ dom }) => {
  let children = [...dom.children]

  return children.map((child, idx) => {
    child.style.opacity = 0
    setTimeout(() => {
      child.style.opacity = 1
      animateCSS(animation)({ dom: child })
    }, idx * 100)
  })
}

export const AnimateSideBar = (animation) => ({ dom }) =>
  SlideChildrenInRight(animation)({ dom })
