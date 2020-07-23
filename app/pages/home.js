import { animateChildrenIn } from "styles/animations"
import { Pause } from "Utils"

export const Home = {
  view: () =>
    m(
      ".page",
      { oncreate: animateChildrenIn(["fadeInUp", Pause(1), Pause(1)]) },
      [
        m("img#boazface", {
          src: "images/boazface.jpg",
        }),
        m(
          "code.",
          { style: { fontSize: "2rem" } },
          "Front-End developer with 4 +  years industry experience building a variety of different applications using a multitude of different frameworks and languages."
        ),
      ]
    ),
}
