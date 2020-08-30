export const IsLoading = () => {
  return {
    view: () =>
      m("img.logo.rotateCenter", {
        src: "images/logo.svg",
        style: {
          position: "absolute",
          height: "200px",
          width: "200px",
          zIndex: 1000,
          bottom: "-10%",
          right: "35%",
        },
      }),
  }
}
