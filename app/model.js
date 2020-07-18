const model = {
  state: {
    isLoading: false,
    loadingProgress: { max: 0, value: 0 },
    isLoggedIn: () => sessionStorage.getItem("token"),
  },
  routes: ["/home", "/portfolio", "/snippets", "/resume"],
  status: { sidebar: false },
  settings: {},
  slug: "",
}

export default model
