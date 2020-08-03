import Routes from "./Routes/index"

const toRoutes = (mdl) => (acc, route) => {
  acc[route.route] = {
    onmatch: (args, path, fullroute) => {
      if (route.group.includes("authenticated") && !mdl.state.isAuth()) {
        mdl.route.set(m.route.get())
      }
      mdl.state.route = route
      mdl.state.anchor = path.split("#")[1]
      let isAnchor = Boolean(mdl.state.anchor)
      route.onmatch(mdl, args, path, fullroute, isAnchor)
    },
    render: () => route.component(mdl),
  }
  return acc
}

const App = (mdl) => Routes.reduce(toRoutes(mdl), {})

export default App
