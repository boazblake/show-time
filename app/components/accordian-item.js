import { AddLine, TimesLine } from "@mithril-icons/clarity/cjs"

export const AccordianItem = () => {
  return {
    view: ({ children, attrs: { state, part, title, pills = [] } }) =>
      m(".accordian-item.full-width", [
        m(`.accordian-item-title${state[part].show() ? "-open" : "-closed"}`, [
          m(
            ".frow",
            m(".col-xs-1-3", m("h4", title)),
            m(".col-xs-1-3", pills),
            m(
              ".frow row-end col-xs-1-3",
              m(
                `.accordian-item-btn`,
                {
                  onclick: (e) => state[part].show(!state[part].show()),
                },
                state[part].show()
                  ? m(TimesLine, {
                      class: "clickable",
                    })
                  : m(AddLine, { class: "clickable" })
              )
            )
          ),
        ]),
        state[part].show() && m(".accordian-item-body", [children]),
      ]),
  }
}
