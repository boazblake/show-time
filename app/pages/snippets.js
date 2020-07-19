import { TicTacToe } from "components"

console.log(TicTacToe)

const AddSnip = ({ dom }) => {
  window.Flems(dom, TicTacToe)
}

export const Snippets = () => {
  return {
    view: () =>
      m(".page", [
        "SNIPPETS",
        m(".", { style: { height: "500px" }, oncreate: AddSnip, id: "test" }),
      ]),
  }
}
