import { Layout } from "components"
import { animateCSS } from "styles/animations"
import { Home, About, Portfolio, Snippets, Resume } from "pages"

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
            oncreate: animateCSS("slideInLeft"),
            onscroll: (e) => console.log(e),

            onbeforeremove: animateCSS("slideOutRight"),
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
            oncreate: animateCSS("slideInLeft"),
            onscroll: (e) => console.log(e),

            onbeforeremove: animateCSS("slideOutRight"),
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
            oncreate: animateCSS("slideInLeft"),
            onscroll: (e) => console.log(e),

            onbeforeremove: animateCSS("slideOutRight"),
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
            oncreate: animateCSS("slideInLeft"),
            onscroll: (e) => console.log(e),

            onbeforeremove: animateCSS("slideOutRight"),
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
            oncreate: animateCSS("slideInLeft"),
            onscroll: (e) => console.log(e),

            onbeforeremove: animateCSS("slideOutRight"),
            mdl,
          })
        ),
    },
  }
}

export default routes
