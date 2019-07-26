const {app, Menu, Tray, shell} = require('electron');
const path = require('path');
const electronStore = require('electron-store');
const store = new electronStore();
const { dialog } = require('electron');

let tray = null;

create = () => {
    tray = new Tray(path.join(__dirname, '../assets/images/trayTemplate.png'));
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Open Applications', 
        click () {
          let paths = store.get(`paths`, []);

          if(paths != null) {
            paths.forEach((path) => {
              shell.openItem(path);
            });
          }
        }
      },
      { label: 'Set Applications', 
        click () {
          let paths = dialog.showOpenDialog({defaultPath: '/Applications', properties: ['openFile', 'multiSelections'], filters: [{name: 'Applications', extensions: ['app']}]});

          if(paths != null) {
            store.set(`paths`, paths);
          }
        }
      },
      { type: 'separator' },
      { label: 'About', 
        click () {
          shell.openExternalSync('https://github.com/xxgicoxx/lans')
        }
      },
      { label: 'Quit', 
        click () {
          app.quit();
        }
      }
    ]);
  
    tray.setToolTip("Lans");
    tray.setContextMenu(contextMenu);
}

module.exports = {
    create: create
}