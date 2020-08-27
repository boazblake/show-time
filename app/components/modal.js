export const Modal = () => {
  return {
    view: ({ children }) => {
      return m(
        ".modal",
        children.map(({ header, body, footer }) =>
          m(".modal-container", [
            m(".modal-header", header),
            m(".modal-body", body),
            m(".modal-footer", footer),
          ])
        )
      )
    },
  }
}
