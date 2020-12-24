import http from "../Http.js"
import { getShows, onError } from "./fns.js"
import { Modal, List } from "components"

const getShowsTask = (mdl) => (http) =>
  getShows(mdl)(http).fork(onError, (shows) => (mdl.user.shows = shows))

export const Home = () => {
  return {
    oninit: ({ attrs: { mdl } }) => getShowsTask(mdl)(http),
    view: ({ attrs: { mdl } }) =>
      mdl.state.details.selected() ? m(Modal, { mdl }) : m(List, { mdl }),
  }
}
