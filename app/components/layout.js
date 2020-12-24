import Routes from "../routes/index.js"
import http from "../Http.js"
import { searchShowsTask, onError, updateState } from "../pages/fns.js"
import { showSettings } from "./action-sheet"
import Toast from "./toast"

const searchShows = (mdl) =>
  searchShowsTask(mdl)(http).fork(onError(mdl)("search"), mdl.data.shows)

const HomeToolBar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "ion-segment",
        { scrollable: true, value: mdl.state.currentList() },
        mdl.user.lists.map((list) =>
          m(
            "ion-segment-button",
            {
              onclick: () => {
                mdl.state.currentList(list)
                mdl.state.listDom.closeSlidingItems()
              },
              value: list,
            },
            list
          )
        )
      ),
  }
}

const SearchToolBar = () => {
  return {
    onremove: ({ attrs: { mdl } }) => mdl.state.query(null),
    view: ({ attrs: { mdl } }) =>
      m("ion-searchbar", {
        style: { paddingTop: "12px" },
        animated: true,
        "show-cancel-button": "never",
        placeholder: "Search for a show",
        value: mdl.state.query(),
        oninput: (e) => mdl.state.query(e.target.value),
        onkeyup: () => searchShows(mdl),
        onionClear: (e) => mdl.state.query(mdl.data.shows([])),
      }),
  }
}

const Toolbar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "ion-header",
        m(
          "ion-toolbar",
          mdl.state.route.name == "home" && m(HomeToolBar, { mdl }),
          mdl.state.route.name == "search" && m(SearchToolBar, { mdl })
        )
      ),
  }
}

const Footer = () => {
  let tabbedRoutes = Routes.filter((r) => r.group.includes("authenticated"))
  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        "ion-footer",
        m(
          "ion-tab-bar",
          m("ion-tabs", [
            tabbedRoutes.map((r) => m("ion-tab", { tab: `${r.route}` })),
            m("ion-tab-bar", { slot: "bottom" }, [
              tabbedRoutes.map((r) =>
                m(
                  "ion-tab-button",
                  {
                    onclick: () => m.route.set(r.route),
                    tab: `${r.route}`,
                  },
                  [m("ion-label", r.name), m("ion-icon", { name: r.icon })]
                )
              ),
              m(
                "ion-tab-button",
                {
                  onclick: () => showSettings(mdl),
                },
                [
                  m("ion-label", "settings"),
                  m("ion-icon", { name: "ellipsis-vertical-outline" }),
                ]
              ),
            ]),
          ])
        )
      )
    },
  }
}

export const Layout = {
  view: ({ attrs: { mdl }, children }) => {
    return m("ion-app", [
      mdl.state.isAuth() && m(Toolbar, { mdl }),
      m("ion-content", children),
      mdl.state.isAuth() && m(Footer, { mdl }),
      mdl.toast.show() && m(Toast, { mdl }),
    ])
  },
}

export const PageWrap = {
  view: ({ children }) => m(".page", { slot: "fixed" }, children),
}

export const FormWrap = {
  view: ({ children, attrs: { state } }) =>
    m("form", updateState(state), children),
}
