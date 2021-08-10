const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  screen
} = require('electron')
const path = require('path')
let mainWindow;
var wwidth = 400
var wheight = 300
var ishidden = false
ipcMain.on('synchronous-message', (event, arg) => {
  app.quit();
});
function youtubeb(url) {
  return ("https://www.youtube.com/embed/" + url.substr(32))

}

function deyoutube(url) {
  return ("https://www.youtube.com/watch?v=" + url.substr(30))
}

app.whenReady().then(() => {

  mainWindow = new BrowserWindow({

      width: wwidth,
      height: wheight,
      transparent: true,
      frame: false,
      webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          allowRunningInsecureContent: true,
      }
  })

  mainWindow.setPosition(0, 0)
  mainWindow.setAlwaysOnTop(true);
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);
    const { screen } = require('electron')
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  mainWindow.loadURL("https://www.youtube.com");
  
  console.log("width" + width)

  app.on('activate', function() {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  globalShortcut.register('CommandOrControl+y+w+q', () => {
      mainWindow.setPosition(0, 0)
  })
  globalShortcut.register('CommandOrControl+y+s+d', () => {
    console.log("command")
      mainWindow.setPosition(width-wwidth, height-wheight)
  })
  globalShortcut.register('CommandOrControl+y+e', () => {
      mainWindow.setPosition(width-wwidth, 0)
  })
  globalShortcut.register('CommandOrControl+y+Shift', () => {
      mainWindow.setPosition(0, height-wheight)
  })
  globalShortcut.register('CommandOrControl+y+m', () => {
      mainWindow.loadURL("https://www.youtube.com");
  })
  globalShortcut.register('CommandOrControl+.', () => {
    wwidth+=100
   mainWindow.setSize(wwidth,wheight)

  })
   globalShortcut.register('CommandOrControl+,', () => {
    wwidth-=100
   mainWindow.setSize(wwidth,wheight)

  })
  globalShortcut.register('CommandOrControl+k', () => {
    wheight-=100
   mainWindow.setSize(wwidth,wheight)

  })
   globalShortcut.register('CommandOrControl+l', () => {
    wheight+=100
   mainWindow.setSize(wwidth,wheight)

  })
    globalShortcut.register('CommandOrControl+h', () => {
      console.log(mainWindow.isVisable)
  if(!ishidden){
   mainWindow.hide()
   ishidden = true
  }else{
    mainWindow.show()
    ishidden=false
  }
 
  })
  globalShortcut.register('CommandOrControl+p', () => {
    globalShortcut.unregisterAll()
   app.quit()
  
  })
  globalShortcut.register('CommandOrControl+y+r', () => {
      url = mainWindow.webContents.getURL()
      if (url.substr(0, 32) == "https://www.youtube.com/watch?v=") {
          mainWindow.loadURL(youtubeb(url));
      }
      if (url.substr(0, 30) == "https://www.youtube.com/embed/") {
          mainWindow.loadURL(deyoutube(url));
      }
  })
})
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit()
  globalShortcut.unregisterAll()
})
