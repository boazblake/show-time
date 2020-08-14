import { Logo } from "Components"

export const EmptyState = () => {
  return {
    view: ({ attrs: { text } }) =>
      m(".logo-placeholder", [m("h3.text-center", text), Logo]),
  }
}
