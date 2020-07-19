import { TTT_JS, TTT_CSS, TTT_HTML } from "./TTT/index"

export const TicTacToe = {
  files: [
    { name: "app.js", content: TTT_JS },
    { name: "style.css", content: TTT_CSS },
    { name: "index.html", content: TTT_HTML },
  ],
  links: [
    { name: "mithril", type: "js", url: "https://unpkg.com/mithril" },
    {
      name: "ramda",
      type: "js",
      url: "https://unpkg.com/ramda@0.26.1/dist/ramda.min.js",
    },
    {
      name: "mithril-stream",
      type: "js",
      url: "https://unpkg.com/mithril-stream@2.0.0/stream.js",
    },
  ],
}
