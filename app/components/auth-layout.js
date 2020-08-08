const Logo = m("img.frow", {
  src: "images/logo.svg",
  style: { width: "80%", margin: "0 auto" },
})

export const AuthLayout = {
  view: ({ children }) => m(".frow-container", [Logo, children]),
}
