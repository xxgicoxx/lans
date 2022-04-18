const { app } = require('electron');

const { TrayController } = require('./app/controllers');

const isMac = process.platform === 'darwin';
const isWin = process.platform === 'win32';

if (isWin) {
  app.setAppUserModelId('Lans');
}

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
