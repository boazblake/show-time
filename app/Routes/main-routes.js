import { Login, Register } from "pages"
import { Layout } from "components"

const MainRoutes = [
  {
    id: "login",
    name: "login",
    icon: "login",
    route: "/login",
    isNav: false,
    group: [],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute) => {},
    component: (mdl) => m(Layout, { mdl }, m(Login, { mdl })),
  },
  {
    id: "register",
    name: "register",
    icon: "register",
    route: "/register",
    isNav: false,
    group: [],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute) => {},
    component: (mdl) => m(Layout, { mdl }, m(Register, { mdl })),
  },
]

export default MainRoutes
