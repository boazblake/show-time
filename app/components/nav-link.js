const handlers = (types, fn) =>
  types.reduce((acc, type) => Object.assign(acc, { [type]: fn }), {})

export const NavLink = () => {
  return {
    view: ({ attrs: { mdl, href, link, classList, ...rest } }) =>
      m(
        m.route.Link,
        {
          ...handlers(["onclick", "onmouseover", "onmouseout"], (e) =>
            console.log(e.type)
          ),
          href,
          class: `nav-link ${classList} ${
            mdl.state.navSelected() == link && "shadow"
          }`,
          ...rest,
        },
        link
      ),
  }
}
