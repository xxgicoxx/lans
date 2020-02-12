const {
  app, Menu, Tray, shell,
} = require('electron');
const path = require('path');
const ElectronStore = require('electron-store');

const electronStore = new ElectronStore();
const { dialog } = require('electron');

let tray = null;

class TrayService {
  create() {
    tray = new Tray(path.join(__dirname, '../resources/images/trayTemplate.png'));
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Open Applications',
        click() {
          const paths = electronStore.get('paths', []);

          if (paths != null) {
            paths.forEach((e) => {
              shell.openItem(e);
            });
          }
        },
      },
      {
        label: 'Set Applications',
        click() {
          const paths = dialog.showOpenDialog({ defaultPath: '/Applications', properties: ['openFile', 'multiSelections'], filters: [{ name: 'Applications', extensions: ['app', 'exe'] }] });

          if (paths != null) {
            electronStore.set('paths', paths);
          }
        },
      },
      { type: 'separator' },
      {
        label: 'About',
        click() {
          shell.openExternal('https://github.com/xxgicoxx/lans');
        },
      },
      {
        label: 'Quit',
        click() {
          app.quit();
        },
      },
    ]);

    tray.setToolTip('Lans');
    tray.setContextMenu(contextMenu);
  }
}

module.exports = TrayService;
