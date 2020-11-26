
const toRoutes = (mdl) => (acc, route) => {
  acc[route.route] = {
    onmatch: (args, path, fullroute) => {
      if (route.group.includes("authenticated") && !mdl.state.isAuth()) {
        m.route.set(m.route.get())
      }
      mdl.state.route = route
      route.onmatch(mdl, args, path, fullroute)
    },
    render: () => route.component(mdl),
  }
  return acc
}

const App = (mdl) => mdl.Routes.reduce(toRoutes(mdl), {})

export default App
