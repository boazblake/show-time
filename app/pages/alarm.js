export const Alarm = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        ".alarm",
        m("ion-list", [
          m("ion-item", m("ion-input", { placeholder: "Title" })),
          m("ion-item", m("ion-input", { placeholder: "Location" })),
          m("ion-item-divider"),
          m("ion-item", [
            m("ion-label", "Start Date"),
            m("ion-datetime", {
              value: "1990-02-19",
              placeholder: "Select Date",
            }),
          ]),
          m("ion-item", [
            m("ion-label", "Start Time"),
            m("ion-datetime", {
              "display-format": "h:mm A",
              "picker-format": "h:mm A",
              value: "1990-02-19T07:43Z",
            }),
          ]),
          m("ion-item", [
            m("ion-label", "Ends"),
            m("ion-datetime", {
              value: "1990-02-20",
              placeholder: "Select Date",
            }),
          ]),
          m("ion-item", [
            m("ion-label", "Repeat"),
            m("ion-datetime", { placeholder: "Never", disabled: false }),
          ]),
          m("ion-item", [
            m("ion-label", "Travel Time"),
            m("ion-datetime", { placeholder: "None", disabled: false }),
          ]),
          m("ion-item-divider"),
          m("ion-item", [
            m("ion-label", "Alert"),
            m("ion-datetime", { placeholder: "None", disabled: false }),
          ]),
        ])
      )
    },
  }
}
