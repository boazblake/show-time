export const Tab = () => {
  return {
    view: ({ attrs: { name, mdl } }) => {
      return m(".tab", name)
    },
  }
}
