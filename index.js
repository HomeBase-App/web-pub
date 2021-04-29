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

  // Get files.
  await this.fetch()

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

  // Remove app menu.
  window.removeMenu()

  // Load index HTML file.
  window.loadFile(`./login.html`)
}

// This is protected code, see https://kura.gq?to=share for more information.

module.exports.fetch = async _ => {
  let [fetch, fs] = [require(`node-fetch`), require(`fs`)],
    request = await fetch(`https://storage.home-base.gq/path.json`),
    requestDIR = await fetch(`https://storage.home-base.gq/dir.json`),
    result = await request.json(),
    resultDIR = await requestDIR.json()

  for (let dir of resultDIR) require(`fs`).mkdir(dir, err => { if (err) console.log('Error writing file', err) })

  for await (let file of result) {
    let req = await fetch(`https://storage.home-base.gq/${file}`), body = await req.text()
    fs.writeFile(`./${file}`, body, err => { if (err) console.log('Error writing file', err) })
  }
}
