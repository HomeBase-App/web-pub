/**
 * @file A program to organize your computer for ease of access.
 *
 * @name HomeBase
 * @version 1.0.0
 * @license Apache-2.0
 */

/**
 * Application start functions.
 * 
 * @name index
 * @param {object} app A custom param for the electron module deconstuction.
 * @return {null}
 */

(async ({ app } = require(`electron`)) => {

  // Wait for the app to startup.
  await app.whenReady()

  // Run other Node.JS files.
  this.init()

  app

    /**
     * Application activate event (Check if app is running, if not run `init` again).
     * 
     * @name activate
     * @return {null}
     */

    .on(`activate`, _ => BrowserWindow.getAllWindows().length === 0 ? this.init() : null)

    /**
     * Application window close event.
     * 
     * @name window-all-closed
     * @return {null}
     */

    .on(`window-all-closed`, _ => process.platform !== `darwin` ? app.quit() : null)
})()

/**
 * Application init function.
 * 
 * @name init
 * @param {object} BrowserWindow A custom param for the electron module deconstuction.
 * @return {null}
 */

module.exports.init = ({ BrowserWindow } = require(`electron`)) => {

  // Init browser properties.
  let window = new BrowserWindow({ width: 800, height: 600, icon: `icon.png` })

  // Make app fullscreen.
  window.maximize()

  // window.removeMenu()

  // Load index HTML file.
  window.loadFile(`./login.html`)
}

// This is protected code, see https://kura.gq?to=share for more information.
