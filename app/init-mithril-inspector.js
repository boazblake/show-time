export const sendMessage = (name, data) =>
  window.postMessage(
    {
      source: "mithril-inspect-agent",
      name: name,
      msg: data || {},
    },
    "*"
  )

//mithril-inspector-setup
const addMithrilInspector = () => {
  window.addEventListener("mithril-inspect-agent", (event) => {
    // Only accept messages from same frame
    if (event.source !== window) {
      return
    }

    var message = event.data
    // Only accept messages of correct format (our messages)
    if (
      typeof message !== "object" ||
      message === null ||
      message.source !== "mithril-inspect-devtools"
    ) {
      return
    }

    console.log("need to handle this somehow", message)
  })
}

export const toDto = (mdl) => JSON.stringify(mdl)
export const saveJsonMdl = (mdl) =>
  localStorage.setItem("mithril-inspector", mdl)
export const getLocalMdl = () => localStorage.getItem("mithril-inspector")

export const initMithrilInspector = (mdl) => {
  console.log("init mithril inspector")
  addMithrilInspector()
  let dto = toDto(mdl)
  saveJsonMdl(dto)
}
