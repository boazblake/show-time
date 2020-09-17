import { Home, Alarm, CameraPage } from "Pages"
import { Layout } from "Components"

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
    id: "alarm",
    name: "alarm",
    icon: "alarm-outline",
    route: "/alarm",
    isNav: false,
    group: [],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute) => {},
    component: (mdl) => m(Layout, { mdl }, m(Alarm, { mdl })),
  },
  {
    id: "camera",
    name: "camera",
    icon: "camera-outline",
    route: "/camera",
    isNav: false,
    group: [],
    children: [],
    options: [],
    onmatch: (mdl, args, path, fullroute) => {},
    component: (mdl) => m(Layout, { mdl }, m(CameraPage, { mdl })),
  },
]

export default Routes
