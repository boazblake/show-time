import { Logo } from "Components"

export const EmptyState = () => {
  return {
    view: ({ attrs: { text } }) =>
      m(
        ".empty-state frow centered-column justify-between",
        m(".logo-placeholder", [
          m("h3.text-center.mt-50", text),
          m(".logo", Logo),
        ])
      ),
  }
}
