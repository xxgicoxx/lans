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
    tray = new Tray(this.getIconPath());

    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Open Applications',
        async click() {
          const paths = await electronStore.get('paths', []);

          if (paths != null && paths.filePaths) {
            paths.filePaths.forEach((e) => {
              shell.openPath(e);
            });
          }
        },
      },
      {
        label: 'Set Applications',
        async click() {
          const paths = await dialog.showOpenDialog(
            {
              defaultPath: '/Applications',
              properties: ['openFile', 'multiSelections'],
              filters: [
                {
                  name: 'Applications',
                  extensions: ['app', 'exe'],
                },
              ],
            },
          );

          if (paths != null) {
            electronStore.set('paths', paths);
          }
        },
      },
      {
        type: 'separator',
      },
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

  getIconPath() {
    if (app.isPackaged) {
      return path.join(process.resourcesPath, 'static', 'img', 'trayTemplate.png');
    }

    return `${path.join(__dirname, '../static/img/trayTemplate.png')}`;
  }
}

module.exports = TrayService;
