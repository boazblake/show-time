import { Login, Register } from "Pages"
import { AuthLayout } from "Components"
const Routes = [
  {
    id: "login",
    name: "Account Login",
    route: "/login",
    isNav: false,
    group: [],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute) => {},
    component: (mdl) => m(AuthLayout, { mdl }, m(Login, { mdl })),
  },
  {
    id: "register",
    name: "Register Account",
    route: "/register",
    isNav: false,
    group: [],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute) => {},
    component: (mdl) => m(AuthLayout, { mdl }, m(Register, { mdl })),
  },
]

export default Routes
