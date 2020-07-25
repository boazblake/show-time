import { AnimateChildren, fadeInUp } from "Styles"
import { Pause } from "Utils"

export const Resume = () => {
  return {
    view: () =>
      m(
        ".page.frow-container",
        {
          oncreate: AnimateChildren(fadeInUp, Pause(0.15)),
        },
        [
          m(
            "a",
            {
              href: "files/resume.pdf",
              title: "Boaz Blake Web Dev Resume",
              download: "files/resume.pdf",
            },
            "Download PDF"
          ),
          m("img", {
            width: "900px",
            height: "1000px",
            src: "images/resume.jpeg",
          }),
          m("img", {
            width: "900px",
            height: "1000px",
            src: "images/resume 2.jpeg",
          }),
        ]
      ),
  }
}
