import { animateChildren } from "styles/animations"

export const Home = () => {
  let state = { showAbout: false }
  return {
    view: () =>
      m(".page", { oncreate: animateChildren("fadeInUp") }, [
        m("img#boazface", {
          src: "images/boazface.jpg",
        }),
        m(
          "code.",
          { style: { fontSize: "2rem" } },
          "Front-End developer with 4 +  years industry experience building a variety of different applications using a multitude of different frameworks and languages."
        ),
      ]),
  }
}
