import { Animate, focusIn, focusInContract } from "Styles"

const rotateCenter = {
  "animation-name": "rotate-center",
  "animation-duration": "1s",
  "animation-timing-function": "ease",
  "animation-delay": "0s",
  "animation-iteration-count": "infinite",
  "animation-direction": "normal",
  "animation-fill-mode": "none",
}

const Logo = {
  view: ({ attrs: { mdl } }) =>
    m("img.logo", {
      src: "images/logo.svg",
      style: {
        ...(mdl.State.isLoading() && rotateCenter),
        paddingTop: "50px",
        height: "200px",
        width: "200px",
        margin: "0 auto",
      },
    }),
}

const Heading = {
  view: ({ attrs: { mdl } }) =>
    m(
      ".heading-logo",
      m("span.frow column-center", [
        m(
          "h2",
          m(
            "span.frow mt-30 items-center justify-center height-100.p-30",
            {
              oncreate: Animate(focusInContract, {
                duration: 500,
              }),
            },
            m("span.heading-title-q.p-30", "Having a ShinDig ?")
          )
        ),
        m(
          "h1.p-30.heading-title-a",
          {
            oncreate: Animate(focusIn, {
              delay: 1000,
            }),
          },
          "ShinDigIt!"
        ),
        m(Logo, { mdl }),
      ])
    ),
}

export const AuthLayout = {
  view: ({ attrs: { mdl }, children }) =>
    m(".frow", [m(Heading, { mdl }), children]),
}
