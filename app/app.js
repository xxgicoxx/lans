const {app} = require('electron');
const tray = require('./menu/tray');

app.dock.hide();

app.setLoginItemSettings({
  openAtLogin: true
});

app.on('ready', () => {
  tray.create();
});

app.on('window-all-closed', () => {
  app.quit();
});