import { Home, Alarm, SearchPage } from "pages"
import { Layout } from "components"

const Routes = [
  {
    id: "home",
    name: "home",
    icon: "home",
    route: "/home",
    isNav: false,
    group: [],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute) => {},
    component: (mdl) => m(Layout, { mdl }, m(Home, { mdl })),
  },
  {
    id: "search",
    name: "search",
    icon: "search-outline",
    route: "/search",
    isNav: false,
    group: [],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute) => {},
    component: (mdl) => m(Layout, { mdl }, m(SearchPage, { mdl })),
  },
]

export default Routes
