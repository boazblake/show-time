import Routes from "../routes/index.js"
import http from "../Http.js"
import { searchShowsTask, onError } from "../pages/fns.js"

  const searchShows = (mdl) =>
    searchShowsTask(mdl)(http).fork(onError(mdl)("search"), mdl.data.shows)



const HomeToolBar = () => {
  return {
    view: ({attrs:{mdl}}) =>
     m("ion-segment", {"value":mdl.state.currentList()},
      mdl.user.lists().map(list => m("ion-segment-button", {onclick: () => mdl.state.currentList(list),  "value": list }, list))
    )
  }
}

const SearchToolBar = () => {
  return {
    view: ({attrs:{mdl}}) =>
      m('ion-searchbar',
        {
          animated: true,
          'show-cancel-button':"focus" ,
          placeholder: 'Search for a show',
           value: mdl.state.query(),
            oninput: (e) => mdl.state.query(e.target.value),
            onchange: () => searchShows(mdl)
        }
      )
  }
}


const Toolbar = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { mdl } }) =>
       m("ion-header", m("ion-toolbar",
         mdl.state.route.name == 'home' && m(HomeToolBar, {mdl}),
         mdl.state.route.name == 'search' && m(SearchToolBar, {mdl})
      ))
    ,
  }
}

const Footer = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        "ion-footer",
        m(
          "ion-tab-bar",
          m("ion-tabs", [
            Routes.map((r) => m("ion-tab", { tab: `${r.route}` })),
            m("ion-tab-bar", { slot: "bottom" }, [
              Routes.map((r) =>
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
                  m("ion-label", "Settings"),
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

export const Layout = () => {
  return {
    view: ({ attrs: { mdl }, children }) => {
      return m("ion-app", [
        m(Toolbar, { mdl }),
        m("ion-content", children),
        m(Footer, { mdl }),
      ])
    },
  }
}
