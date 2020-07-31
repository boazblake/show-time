import { Home } from "Pages/home"

const routes = (mdl) => {
  return {
    "/": {
      onmatch: (_, b) => (mdl.slug = b),
      render: () => m(Home, { mdl }),
    },
  }
}

export default routes
