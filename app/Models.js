import Routes from "./routes"

const state = {
  isAuth: Stream(false),
  route: "",
  paginate: {
    page: Stream(1),
    total_pages: Stream(0),
    total_results: Stream(0),
  },
  query: Stream(""),
  isLoading: Stream(false),
  loadingProgress: {
    max: Stream(null),
    value: Stream(null),
  },
  searchItem: {
    showMenu: Stream(false),
  },
  details: {
    selected: Stream(null),
  },
  currentList: Stream("Watching"),
  domList: null,
  mode: "light",
  toast: {},
}

const toast = {
  show: Stream(false),
  duration: Stream(2000),
  status: Stream(null),
  msg: Stream(null),
}

const data = {
  shows: Stream([]),
  details: Stream(null),
}

const errors = {
  details: Stream(null),
  search: Stream(null),
  user: Stream(null),
}

const user = {
  shows: Stream([]),
  lists: Stream(["Watching", "Wishlist"]),
  data: {},
}

const Model = {
  db: "prodshows",
  toast,
  Routes,
  state,
  user,
  data,
  errors,
}

export default Model
