import { Plugins , ActionSheetOptionStyle} from '@capacitor/core';

const { Modals } = Plugins;

async function showAlert() {
  let alertRet = await Modals.alert({
    title: 'Stop',
    message: 'this is an error'
  });
}

async function showConfirm() {
  let confirmRet = await Modals.confirm({
    title: 'Confirm',
    message: 'Are you sure you\'d like to press the red button?'
  });
  console.log('Confirm ret', confirmRet);
}

async function showPrompt() {
  let promptRet = await Modals.prompt({
    title: 'Hello',
    message: 'What\'s your name?'
  });
  console.log('Prompt ret', promptRet);
}

async function showActions(state) {
  let promptRet = await Modals.showActions({
    title: 'Photo Options',
    message: 'Select an option to perform',
    options: [
      {
        title: 'Upload'
      },
      {
        title: 'Share'
      },
      {
        title: 'Remove',
        style: ActionSheetOptionStyle.Destructive
      }
    ]
  })

  switch (promptRet.index) {
    case 0:
      showConfirm()
      break;
    case 1:
      showPrompt()
      break;
    case 2:
      showAlert()
    default:
      break;
  }
}

export const Home = () => {
  const state = {}
  return {
    view: ({ attrs: { mdl } }) => {
      return m(".home", m('ion-button', {onclick: e => showActions(state)},"HOME"))
    },
  }
}
