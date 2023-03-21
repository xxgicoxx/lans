const {
  app, Menu, Tray, shell,
} = require('electron');
const path = require('path');
const ElectronStore = require('electron-store');

const electronStore = new ElectronStore();
const { dialog } = require('electron');

const { constants } = require('../utils');

let tray = null;

class TrayService {
  create() {
    tray = new Tray(this.getIconPath());

    const contextMenu = Menu.buildFromTemplate([
      {
        label: constants.MENU_OPEN_APPLICATIONS,
        async click() {
          const paths = await electronStore.get(constants.PATHS, []);

          if (paths != null && paths.filePaths) {
            paths.filePaths.forEach((e) => {
              shell.openPath(e);
            });
          }
        },
      },
      {
        label: constants.MENU_SET_APPLICATIONS,
        async click() {
          const paths = await dialog.showOpenDialog(
            {
              defaultPath: constants.MENU_APPLICATIONS_DEFAULT_PATH,
              properties: constants.MENU_APPLICATIONS_PROPERTIES,
              filters: [
                {
                  name: constants.MENU_APPLICATIONS_FILTER,
                  extensions: constants.MENU_APPLICATIONS_EXTENSIONS,
                },
              ],
            },
          );

          if (paths != null) {
            electronStore.set(constants.PATHS, paths);
          }
        },
      },
      {
        type: constants.SEPARATOR,
      },
      {
        label: constants.MENU_ABOUT,
        async click() {
          shell.openExternal(constants.MENU_ABOUT_LINK);
        },
      },
      {
        label: constants.MENU_QUIT,
        async click() {
          app.quit();
        },
      },
    ]);

    tray.setToolTip(constants.APP_NAME);
    tray.setContextMenu(contextMenu);
  }

  getIconPath() {
    if (app.isPackaged) {
      return path.join(process.resourcesPath, ...constants.PATH_TRAY_TEMPLATE_PACKAGE);
    }

    return `${path.join(__dirname, constants.PATH_TRAY_TEMPLATE)}`;
  }
}

module.exports = TrayService;
