import { AddLine, TimesLine } from "@mithril-icons/clarity/cjs"

export const AccordianItem = () => {
  return {
    view: ({ children, attrs: { mdl, state, data, part, title } }) =>
      m(".accordian-item.full-width", [
        m(".accordian-item-title", [
          m(
            ".frow",
            m(".col-xs-1-2", m("h4", title)),
            m(
              ".frow row-end col-xs-1-3",
              m(
                `.accordian-item-btn`,
                {
                  onclick: (e) => state[part].show(!state[part].show()),
                },
                state[part].show() ? m(TimesLine) : m(AddLine)
              )
            )
          ),
        ]),
        state[part].show() && m(".accordian-item-body", [children]),
      ]),
  }
}
