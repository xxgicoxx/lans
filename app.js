const { app } = require('electron');
const { TrayController } = require('./app/controllers');

const isMac = process.platform === 'darwin';

if (isMac) {
  app.dock.hide();
}

app.setLoginItemSettings({
  openAtLogin: true,
});

app.on('ready', () => {
  const trayController = new TrayController();

  trayController.create();
});

app.on('window-all-closed', () => {
  app.quit();
});
