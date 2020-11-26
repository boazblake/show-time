import { actionSheetController } from "@ionic/core"
import Routes from "../routes/index.js"

const showSettings = (mdl) => {
  const showAction = (e) => {
    const actionSheet = actionSheetController
      .create({
        header: "Albums",
        buttons: [
          { text: "Delete", role: "destructive" },
          { text: "Share" },
          { text: "Play" },
          { text: "Favorite" },
          { text: "Cancel", role: "cancel" },
        ],
      })
      .then((x) => {
        console.log(x)
        x.present()
      })
  }
  showAction()
}

const Menu = () => {
  return {
    view: () =>
      m("ion-menu", { "content-id": "main-content" }, [
        m(
          "ion-header",
          m("ion-toolbar", { color: "primary" }, m("ion-title", "Menu"))
        ),
        m(
          "ion-content",
          m("ion-list", [
            m("ion-list-header", " Navigate "),
            m(
              "ion-menu-toggle",
              { "auto-hide": "false" },
              m("ion-item", { button: "" }, [
                m("ion-icon", { slot: "start", name: "home" }),
                m("ion-label", " Home "),
              ])
            ),
          ])
        ),
      ]),
  }
}

const Toolbar = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m("ion-header", m("ion-toolbar", [m("ion-title", m.route.get())]))
    },
  }
}

const Router = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        "ion-router",
        Routes.map((r) => {
          console.log(r)
          return m("ion-route", { url: `/#!/${r.name}` })
        })
      )
    },
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
            Routes.map((r) => m("ion-tab", { tab: `/#!/${r.name}` })),
            m("ion-tab-bar", { slot: "bottom" }, [
              Routes.map((r) =>
                m(
                  "ion-tab-button",
                  {
                    onclick: () => m.route.set(r.route),
                    tab: `/#!/${r.name}`,
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
        m("ion-contents", children),
        m(Footer, { mdl }),
      ])
    },
  }
}
