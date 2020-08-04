import { Home, Event } from "Pages"
import { scrollToAnchor } from "Utils"

const AuthenticatedRoutes = [
  {
    id: "profile",
    name: "Profile",
    // icon: Icons.logo,
    route: "/profile/:name",
    position: ["toolbar"],
    group: ["authenticated"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.State.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Home, { mdl }),
  },
  {
    id: "day-planner",
    name: "Day Planner",
    // icon: Icons.logo,
    route: "/:username/:date",
    position: ["toolbar"],
    group: ["authenticated"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.State.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
      let date = M.utc(args.date).clone()
      mdl.selectedDate(date)
    },
    component: (mdl) => m(Home, { mdl }),
  },
  {
    id: "event",
    name: "Event",
    // icon: Icons.logo,
    route: "/:username/:date/:hour/:min",
    position: ["toolbar"],
    group: ["authenticated"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor
        ? scrollToAnchor(mdl.state.anchor)
        : window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
    },
    component: (mdl) => m(Event, { mdl, key: new Date() }),
  },
  {
    id: "logout",
    name: "",
    // icon: Icons.users,
    route: "/logout",
    position: [],
    group: ["authenticated", "admin"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      })

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
