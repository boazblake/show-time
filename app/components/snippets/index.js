import { TTT, TTT_CSS, TTT_HTML } from "./TTT/index"
import { GOL, GOL_CSS, GOL_HTML } from "./GOL/index"
import { SHAPE, SHAPE_CSS, SHAPE_HTML } from "./SHAPE/index"

const MITHRIL = {
  name: "mithril",
  type: "js",
  url: "https://unpkg.com/mithril",
}

export const TicTacToe = {
  id: "TicTacToe",
  title: "Tic Tac Toe",
  code: {
    files: [
      { name: "app.js", content: TTT },
      { name: "style.css", content: TTT_CSS },
      { name: "index.html", content: TTT_HTML },
    ],
    links: [
      MITHRIL,
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
  },
}

export const GameOfLife = {
  id: "GameOfLife",
  title: "Game Of Life",
  code: {
    files: [
      { name: "app.js", content: GOL },
      { name: "style.css", content: GOL_CSS },
      { name: "index.html", content: GOL_HTML },
    ],
    links: [
      MITHRIL,
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
  },
}

export const ShapeShifter = {
  id: "DynamicSVGManipulation",
  title: "Dynamic SVG Manipulation",
  code: {
    files: [
      { name: "app.js", content: SHAPE },
      { name: "style.css", content: SHAPE_CSS },
      { name: "index.html", content: SHAPE_HTML },
    ],
    links: [MITHRIL],
  },
}
