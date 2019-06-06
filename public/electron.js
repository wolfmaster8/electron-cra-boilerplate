const { app, BrowserWindow, shell, ipcMain } = require('electron');

const path = require('path');

function isDev() {
    return process.mainModule.filename.indexOf('app.asar') === -1;
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    const isDevMode = isDev();
    // Create the browser window.
    mainWindow = new BrowserWindow({
        backgroundColor: '#F7F7F7',
        height: 860,
        width: 1015,
        minWidth: 880,
        show: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + '/preload.js'
        }
    });


    mainWindow.loadURL(
        isDevMode ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );

    if (isDevMode) {
        const {
            default: installExtension,
            REACT_DEVELOPER_TOOLS,
            REDUX_DEVTOOLS
        } = require('electron-devtools-installer');

        installExtension(REACT_DEVELOPER_TOOLS)
            .then(name => {
                console.log(`Extensão instalada: ${name}`)
            })
            .catch(err => {
                console.log(`Ocorreu um erro ao instalar.`, err)
            });

        installExtension(REDUX_DEVTOOLS)
            .then(name => {
                console.log(`Extensão instalada: ${name}`)
            })
            .catch(err => {
                console.log(`Ocorreu um erro ao instalar.`, err)
            })
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        ipcMain.on('open-external-window', (event, arg) => {
            shell.openExternal(arg)
        })
        mainWindow.webContents.openDevTools();
    });


    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

ipcMain.on('load-page', (event, arg) => {
    mainWindow.loadURL(arg);
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
