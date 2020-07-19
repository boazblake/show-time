export const CV = {
  view: () =>
    m(
      "section.resume",
      m("embed.resume-pdf", {
        type: "application/pdf",
        width: "900px",
        height: "900px",
        pluginspage: "http://www.adobe.com/products/acrobat/readstep2.html",
        src: "files/resume.pdf",
      })
    ),
}
