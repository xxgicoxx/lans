const { app } = require('electron');

const { TrayController } = require('./app/controllers');
const { constants } = require('./app/utils');

const isMac = process.platform === constants.PLATFORM_DARWIN;
const isWin = process.platform === constants.PLATFORM_WINDOWS;

if (isWin) {
  app.setAppUserModelId(constants.APP_NAME);
}

if (isMac) {
  app.dock.hide();
}

app.setLoginItemSettings({
  openAtLogin: true,
});

app.on(constants.ON_READY, () => {
  const trayController = new TrayController();

  trayController.create();
});

app.on(constants.ON_WINDOW_ALL_CLOSED, () => {
  app.quit();
});
