/*!
 * Preference Manager, http://tpkn.me/
 */

const fs = require('fs');
const path = require('path');
const electron = require('electron');
const app = electron.app || electron.remote.app;
const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;

class PreferenceManager {
   constructor(){
      this.dir = app.getPath('userData');
      this.file = path.join(this.dir, '.settings');

      // Create app's 'userData' folder if it does not exist
      if(!fs.existsSync(this.dir)){
         fs.mkdirSync(this.dir);
      }

      // Check if .settings file is OK
      this.load();
   }

   /**
    * Load settings
    * 
    * @return {Object}
    */
   load(){
      let data = {};

      try {
         data = JSON.parse(fs.readFileSync(this.file, 'utf8'));
      }catch(e){
         fs.writeFileSync(this.file, JSON.stringify({}), 'utf8');
      }

      return data;
   }

   /**
    * Save settings
    * 
    * @param {Object} data
    * @param {Boolean} do_cleanup
    */
   save(data = {}, do_cleanup = false){
      let last_settings = this.load();
      let settings = Object.assign(last_settings, data);

      // Remove settings == 'null'
      if(do_cleanup){
         this.cleanup(settings);
      }

      fs.writeFileSync(this.file, JSON.stringify(settings, true, 3));
   }

   /**
    * Load and apply settings to the window
    * 
    * @param  {Object} win - BrowserWindow instance
    * @return {Object}
    */
   quickload(win = {}){
      let data = this.load();

      if(win.constructor !== BrowserWindow){
         win = BrowserWindow.getFocusedWindow();
      }

      // Move and resize window if BrowserWindow instance were passed
      let { x, y, width, height } = data;
      let { screen_width, screen_height } = this.bounds();

      if(x && y){
         if(x >= screen_width) x = 0;
         if(y >= screen_height) y = 0;

         win.setPosition(x, y);
      }
      if(width && height){
         win.setSize(width, height);
      }

      return data;
   }

   /**
    * Save window props
    * 
    * @param {Object} win
    * @param {Boolean} do_cleanup
    */
   quicksave(win = {}, do_cleanup = false){
      let data = {};

      if(win.constructor !== BrowserWindow){
         win = BrowserWindow.getFocusedWindow();
      }
      
      // Template for quick save -> BrowserWindow{x, y, width, height}
      data = {
         x: win.getPosition()[0], 
         y: win.getPosition()[1], 
         width: win.getSize()[0], 
         height: win.getSize()[1]
      };

      let last_settings = this.load();
      let settings = Object.assign(last_settings, data);

      // Remove useless settings
      if(do_cleanup){
         this.cleanup(settings);
      }

      fs.writeFileSync(this.file, JSON.stringify(settings, true, 3));
   }

   /**
    * Delete empty settings
    * 
    * @param  {Object} data
    * @return {Object}
    */
   cleanup(data){
      let loop = (obj) => {
         for(let i in obj){
            let val = obj[i];
            let is_object = val instanceof Object && val.constructor === Object;

            if(val == null){
               delete obj[i];
            }

            if(is_object){
               loop(val);
            }

            if(is_object && Object.keys(val).length == 0){
               delete obj[i];
            }
         }

         return obj;
      }

      return loop(data);
   }

   /**
    * List all saved settings
    * @return {Object}
    */
   list(beautify = false){
      let data = this.load();

      if(beautify){
         data = JSON.stringify(data, true, 3);
      }

      return data;
   }

   /**
    * Flush all settings
    * @return {Object}
    */
   flush(){
      fs.writeFileSync(this.file, JSON.stringify({}), 'utf8');

      return {};
   }

   /**
    * Get screen width and height
    * 
    * @return {Object}
    */
   bounds(){
      let screen_width = 0;
      let screen_height = 0;
      
      let screen = electron.screen || electron.remote.screen;
      let displays = screen.getAllDisplays();

      for(let i = 0, len = displays.length; i < len; i++){
         screen_width += displays[i].bounds.width;
         screen_height += displays[i].bounds.height;
      }

      return { screen_width, screen_height };
   }
}

module.exports = new PreferenceManager();
