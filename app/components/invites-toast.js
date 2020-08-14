import { TimesCircleLine } from "@mithril-icons/clarity/cjs"

export const InvitesToast = () => {
  const inviteMsg = (count) =>
    count == 1 ? `is 1 invite` : `are ${count} invites`

  const notificationStatus = () =>
    localStorage.getItem("shindigit-showNotifications") == "true"

  const setNotificationStatus = (val) =>
    localStorage.setItem("shindigit-showNotifications", val)

  return {
    view: ({ attrs: { mdl, invites, locale } }) =>
      m(
        ".invite-alerts-container frow",
        m(".invite-alert mb-10 justify-between", [
          m("p", `There ${inviteMsg(invites)} waiting your attention.`),
          m(
            "label.text-right",
            m("input", {
              type: "checkbox",
              checked: notificationStatus(),
              onclick: (e) => setNotificationStatus(notificationStatus()),
            }),
            "Close and do not show again"
          ),
        ]),

        m(TimesCircleLine, {
          onclick: (e) => setNotificationStatus(false),
          class: "invite-alert-remove",
        })
      ),
  }
}
