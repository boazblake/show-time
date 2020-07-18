import { Layout } from "components"
import { animatePageCSS } from "styles/animations"
import { Home, Portfolio, Snippets, Resume } from "pages"
import { log } from "Utils"

const routes = (mdl) => {
  return {
    "/home": {
      onmatch: (_, b) => {
        mdl.slug = b
        mdl.status.sidebar = false
      },
      render: () =>
        m(
          Layout,
          { mdl },
          m(Home, {
            oncreate: animatePageCSS("slideInLeft"),
            onbeforeremove: animatePageCSS("slideOutRight"),
            mdl,
          })
        ),
    },

    "/portfolio": {
      onmatch: (_, b) => {
        mdl.slug = b
        mdl.status.sidebar = false
      },
      render: () =>
        m(
          Layout,
          { mdl },
          m(Portfolio, {
            oncreate: animatePageCSS("slideInLeft"),
            onbeforeremove: animatePageCSS("slideOutRight"),
            mdl,
          })
        ),
    },

    "/resume": {
      onmatch: (_, b) => {
        mdl.slug = b
        mdl.status.sidebar = false
      },
      render: () =>
        m(
          Layout,
          { mdl },
          m(Resume, {
            oncreate: animatePageCSS("slideInLeft"),
            onbeforeremove: animatePageCSS("slideOutRight"),
            mdl,
          })
        ),
    },

    "/snippets": {
      onmatch: (_, b) => {
        mdl.slug = b
        mdl.status.sidebar = false
      },
      render: () =>
        m(
          Layout,
          { mdl },
          m(Snippets, {
            oncreate: animatePageCSS("slideInLeft"),
            onbeforeremove: animatePageCSS("slideOutRight"),
            mdl,
          })
        ),
    },
  }
}

export default routes
