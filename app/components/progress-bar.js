export const ProgressBar = ({ attrs: { mdl } }) => {
  return {
    view: ({
      attrs: {
        mdl: {
          State: {
            loadingProgress: { value, max },
          },
        },
      },
    }) =>
      mdl.State.isLoading() &&
      m(".progressBar", m("progress.progress", { max, value })),
  }
}
