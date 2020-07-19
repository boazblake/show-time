import { CV } from "components"

export const Resume = () => {
  return {
    view: () => m(".page", "RESUME", m(CV)),
  }
}
