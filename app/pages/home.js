import { AnimateChildren, fadeInUp, Animate, popIn } from "Styles"
import { randomPause, Pause } from "Utils"

export const Home = {
  view: () =>
    m(
      ".page",
      {
        oncreate: AnimateChildren(fadeInUp, Pause(0.05)),
      },
      [
        m(
          ".frow",
          m("img#boazface", {
            src: "images/boazface.jpg",
          }),
          m(".frow.row-around", { padding: "2px" }, [
            m(
              "a",
              {
                target: "_blank",
                href: "https://github.com/boazblake",
              },
              m("img", {
                oncreate: Animate(popIn, randomPause),
                style: { margin: "2px", height: "100px", width: "100px" },
                src: "images/github.svg",
              })
            ),
            m(
              "a",
              {
                target: "_blank",
                href: "https://www.linkedin.com/in/boazblake/",
              },
              m("img", {
                oncreate: Animate(popIn, randomPause),
                style: { margin: "2px", height: "100px", width: "100px" },
                src: "images/linkedin.svg",
              })
            ),
          ])
        ),
        m(
          "p",
          m(
            "code",
            { style: { color: "black", margin: "4px", fontSize: "2rem" } },
            "Front-End developer with 4 +  years industry experience building a variety of different applications using a multitude of different frameworks and languages."
          )
        ),
        m(
          "p",
          m(
            "code",
            { style: { color: "black", margin: "4px", fontSize: "1rem" } },
            "Contact:",
            "boazBlake at protonMail dot com"
          )
        ),
      ]
    ),
}
