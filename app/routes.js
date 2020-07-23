import { Layout } from "components"
import { animatePageCSS } from "styles/animations"
import { Home, About, Portfolio, Snippets, Resume } from "pages"
import { Pause } from "Utils"

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
            // oncreate: animatePageCSS(["slideInLeft", Pause(1)]),
            onscroll: (e) => console.log(e),

            // onbeforeremove: animatePageCSS(["slideOutRight", Pause(1)]),
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
            // oncreate: animatePageCSS(["slideInLeft", Pause(1)]),
            onscroll: (e) => console.log(e),

            // onbeforeremove: animatePageCSS(["slideOutRight", Pause(1)]),
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
            // oncreate: animatePageCSS(["slideInLeft", Pause(1)]),
            onscroll: (e) => console.log(e),

            // onbeforeremove: animatePageCSS(["slideOutRight", Pause(1)]),
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
            // oncreate: animatePageCSS(["slideInLeft", Pause(1)]),
            onscroll: (e) => console.log(e),

            // onbeforeremove: animatePageCSS(["slideOutRight", Pause(1)]),
            mdl,
          })
        ),
    },

    "/about": {
      onmatch: (_, b) => {
        mdl.slug = b
        mdl.status.sidebar = false
      },
      render: () =>
        m(
          Layout,
          { mdl },
          m(About, {
            // oncreate: animatePageCSS(["slideInLeft", Pause(1)]),
            onscroll: (e) => console.log(e),

            // onbeforeremove: animatePageCSS(["slideOutRight", Pause(1)]),
            mdl,
          })
        ),
    },
  }
}

export default routes
