import App from "./App.js"
import Model from "Models"
import { ArrayFP } from "./config"

ArrayFP.configure()

console.log([])

const root = document.body

if (module.hot) {
  module.hot.accept()
}

if (process.env.NODE_ENV == "development") {
  console.log("Looks like we are in development mode!")
} else {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
          console.log("⚙️ SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("🧟 SW registration failed: ", registrationError)
        })
    })
  }
}
if (localStorage.getItem("user")) {
  Model.user = JSON.parse(localStorage.getItem("user"))
  Model.state.isAuth(true)
  m.route.set("/home")
}
m.route(root, "/login", App(Model))
