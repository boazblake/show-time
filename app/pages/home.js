import { AnimateChildren, fadeInUp } from "Styles"
import { Pause } from "Utils"

export const Home = {
  view: () =>
    m(
      ".page",
      {
        oncreate: AnimateChildren(fadeInUp, Pause(1)),
      },
      [
        m("img#boazface", {
          src: "images/boazface.jpg",
        }),
        m(
          "code",
          { style: { color: "black", margin: "4px", fontSize: "2rem" } },
          "Front-End developer with 4 +  years industry experience building a variety of different applications using a multitude of different frameworks and languages."
        ),
      ]
    ),
}
