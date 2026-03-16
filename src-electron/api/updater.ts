import { ipcMain, app } from 'electron'
import ElectronUpdater from 'electron-updater'
import logger from 'electron-log'

const autoUpdater = ElectronUpdater.autoUpdater

logger.transports.file.level = 'debug'

autoUpdater.logger = logger

void autoUpdater.checkForUpdatesAndNotify()

ipcMain.handle('app:get-version', () => app.getVersion())
