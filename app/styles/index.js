export * from "./animations.js"

const defaults = {
  duration: 700,
  easing: "ease-in-out",
  fill: "forwards",
}

function transitionEndPromise(element) {
  const transitionEnded = (e) => {
    // console.log("transitionEnded", element, e)
    if (e.target !== element) return
    element.removeEventListener("transitionend", transitionEnded)
  }
  return new Promise(() =>
    element.addEventListener("transitionend", transitionEnded)
  )
}

export const AnimatePage = (animation, opts) => ({ dom }) => {
  // let origStyles = jsonCopy(dom.style)
  // dom.style.position = "absolute"
  // dom.style.top = -19
  // dom.style.width = "100%"
  Animate(animation, opts)({ dom })
  // Animate(animation)({ dom })
}

export const Animate = (animation, opts) => ({ dom }) => {
  console.log(animation)
  return dom
    .animate(animation, { ...defaults, ...opts })
    .finished.then(transitionEndPromise(dom))
}
export const AnimateChildren = (animation, pause) => ({ dom }) => {
  let children = [...dom.children]

  children.map((child, idx) => {
    child.style.opacity = 0
    setTimeout(() => {
      child.style.opacity = 1
      Animate(animation)({ dom: child })
    }, pause())
  })
}

function ease(v, pow = 4) {
  return 1 - Math.pow(1 - v, pow)
}

function calculateCollapsedScale(el) {
  // The menu title can act as the marker for the collapsed state.
  const collapsed = document.getElementById("scale-me").getBoundingClientRect()

  // Whereas the menu as a whole (title plus items) can act as
  // a proxy for the expanded state.
  const expanded = el.getBoundingClientRect()
  return {
    x: collapsed.width / expanded.width,
    y: collapsed.height / expanded.height,
  }
}

export const createKeyframeAnimation = (isEntrance) => ({ dom }) => {
  let animation = []
  let inverseAnimation = []
  // Figure out the size of the element when collapsed.
  let { x, y } = calculateCollapsedScale(dom)

  for (let step = 0; step <= 100; step++) {
    // Remap the step value to an eased one.
    let easedStep = ease(step / 100)

    // Calculate the scale of the element.
    const xScale = x + (1 - x) * easedStep
    const yScale = y + (1 - y) * easedStep

    animation.push({
      transform: `scale(${xScale}, ${yScale})`,
    })

    // And now the inverse for the contents.
    const invXScale = 1 / xScale
    const invYScale = 1 / yScale
    inverseAnimation.push({
      transform: `scale(${invXScale}, ${invYScale})`,
    })
  }

  console.log(isEntrance ? animation : inverseAnimation)

  return isEntrance ? animation : inverseAnimation
}
