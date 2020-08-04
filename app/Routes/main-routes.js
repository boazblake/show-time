import { Home, Login, Register } from "Pages"
import { scrollToAnchor } from "Utils/index.js"

const Routes = [
  {
    id: "shindig-it",
    name: m(".Logo"),
    // icon: Icons.home,
    route: "/splash",
    isNav: true,
    group: ["toolbar"],
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
    id: "login",
    name: "Account Login",
    // icon: Icons.search,
    route: "/login",
    isNav: false,
    group: [],
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
    component: (mdl) => m(Login, { mdl }),
  },
  {
    id: "register",
    name: "Register Account",
    // icon: Icons.search,
    route: "/register",
    isNav: false,
    group: [],
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
    component: (mdl) => m(Register, { mdl }),
  },
]

export default Routes
