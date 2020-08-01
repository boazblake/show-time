export const Modal = () => {
  return {
    view: ({ children }) => {
      return m(
        ".modal-container",
        m(
          ".frow-container",
          children.map((child) =>
            m(".modal.frow column-center", [
              m(".modal-header", child.header),
              m(".modal-body", child.body),
              m(".modal-footer", child.footer),
            ])
          )
        )
      )
    },
  }
}
