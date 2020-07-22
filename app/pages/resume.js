export const Resume = () => {
  return {
    view: () =>
      m(
        ".page",
        m(
          "section.resume",
          m("embed#resume-pdf", {
            type: "application/pdf",
            width: "100%",
            height: "100%",

            src: "files/resume.pdf",
          })
        )
      ),
  }
}
