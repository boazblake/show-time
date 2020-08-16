const Logo = m("img.logo", {
  src: "images/logo.svg",
  style: {
    paddingTop: "100px",
    height: "300px",
    width: "300px",
    margin: "0 auto",
  },
})

export const AuthLayout = {
  view: ({ children }) => m(".frow", [Logo, children]),
}
