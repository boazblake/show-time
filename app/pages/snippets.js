import { TicTacToe, GameOfLife, ShapeShifter } from "components"

let snippets = [TicTacToe, , GameOfLife, ShapeShifter]
const Snippet = {
  view: ({ attrs: { snip, Flems } }) => {
    return m(".snippet", [
      m("h3.snippet-title", snip.title),
      m(".snippet-code", {
        id: snip.id,
        style: { height: "500px" },
        oncreate: ({ dom }) => Flems(dom, snip.code),
      }),
    ])
  },
}

export const Snippets = ({ attrs: { mdl } }) => {
  return {
    view: () =>
      m(".page", [
        "COMING SOON...",
        // snippets.map((snip, idx) => m(Snippet, { snip, Flems: window.Flems })),
      ]),
  }
}
