// Basic init
const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron
const apiCall = require('../engines/apiCall');
const statsUrlFormats = require('../engines/statsUrlFormats.js');
const eventGetter = require('../getter/eventGetter');

// Let electron reloads by itself when webpack watches changes in ./app/
// require('electron-reload')(__dirname);

// To avoid being garbage collected
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.webContents.openDevTools();
  ipcMain.on('REQUEST_EVENT', (_e, sourceId) => {

    try{
      const url = statsUrlFormats.getBasketballLiveBoxUrl(sourceId);
      console.log(url);
      apiCall.request(url)
        .then(text => {
          const event = eventGetter.get(text);
          const teams = event.teams;
          mainWindow.webContents.send('PRINT_TEXT', JSON.stringify(teams));
        })
        .catch((error) => console.error(e));
    }catch (e){

    }


  });
  console.log('dirname:',__dirname);
    mainWindow.loadURL(`file://${__dirname}/../../index.html`)

})
