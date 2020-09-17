import App from "./App.js"
import Model from "Models"

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

console.log(App(Model))

m.route(root, "/home", App(Model))
