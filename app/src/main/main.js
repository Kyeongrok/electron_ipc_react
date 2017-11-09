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
  mainWindow = new BrowserWindow({width: 1000, height: 500});
  mainWindow.webContents.openDevTools();
  ipcMain.on('REQUEST_EVENT', (_e, sourceId) => {

    try{
      const url = statsUrlFormats.getBasketballLiveBoxUrl(sourceId);
      console.log(url);
      apiCall.request(url)
        .then(text => {
          const json = JSON.parse(text);
          const event = json.apiResults[0].league.season.eventType[0].events[0];
          const result = {url:url, teams:event.teams, startTimestamp:json.startTimestamp, endTimestamp:json.endTimestamp, timeTaken:json.timeTaken}
          mainWindow.webContents.send('PRINT_TEXT', JSON.stringify(result));
        })
        .catch((error) => console.error(e));
    }catch (e){

    }


  });
  console.log('dirname:',__dirname);
    mainWindow.loadURL(`file://${__dirname}/../../index.html`)

})
