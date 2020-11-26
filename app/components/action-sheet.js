import { actionSheetController } from "@ionic/core"
const showSettings = (mdl) => {
  const showAction = (e) => {
    const actionSheet = actionSheetController
      .create({
        header: "Albums",
        buttons: [
          { text: "Delete", role: "destructive" },
          { text: "Share" },
          { text: "Play" },
          { text: "Favorite" },
          { text: "Cancel", role: "cancel" },
        ],
      })
      .then((x) => {
        console.log(x)
        x.present()
      })
  }
  showAction()
}
