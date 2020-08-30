import { Layout } from "Components"
import { Home, Event } from "Pages"

const AuthenticatedRoutes = [
  {
    id: "day-planner",
    name: "Day Planner",
    route: "/:username/:date",
    position: ["toolbar"],
    group: ["authenticated"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      let date = M(args.date).clone()
      mdl.selectedDate(date)
    },
    component: (mdl) => m(Layout, { mdl }, m(Home, { mdl })),
  },
  {
    id: "event",
    name: "Event",
    route: "/:username/events/:title/",
    position: ["toolbar"],
    group: ["authenticated"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {},
    component: (mdl) => m(Layout, { mdl }, m(Event, { mdl })),
  },
  {
    id: "logout",
    name: "",
    route: "/logout",
    position: [],
    group: ["authenticated", "admin"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      localStorage.clear()
      sessionStorage.clear()
      mdl.state.isAuth(false)
      mdl.user = {}
      m.route.set(m.route.get())
      console.log("loggout", mdl)
    },
    component: (mdl) => m(Home, { mdl }),
  },
]

export default AuthenticatedRoutes
