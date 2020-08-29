import { Layout } from "Components"
import { Home, Event } from "Pages"

const AuthenticatedRoutes = [
  // {
  //   id: "profile",
  //   name: "Profile",
  //   // icon: Icons.logo,
  //   route: "/profile/:name",
  //   position: ["toolbar"],
  //   group: ["authenticated"],
  //   children: [],
  //   options: [],
  //   onmatch: (mdl, args, path, fullroute, isAnchor) => {},
  //   component: (mdl) => m(Layout, { mdl }, m(Profile, { mdl })),
  // },
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
      let date = M(args.date).clone()
      mdl.selectedDate(date)
    },
    component: (mdl) => m(Layout, { mdl }, m(Home, { mdl })),
  },
  {
    id: "event",
    name: "Event",
    // icon: Icons.logo,
    // route: "/:username/:date/:hour/:min",
    route: "/:username/events/:title/",
    position: ["toolbar"],
    group: ["authenticated"],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      // if (
      //   m.route.param().username == mdl.User.name &&
      //   !mdl.Events.currentEventId()
      // ) {
      //   mdl.Events.currentEventId(localStorage.getItem("eventId"))
      // }
    },
    component: (mdl) => m(Layout, { mdl }, m(Event, { mdl })),
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
