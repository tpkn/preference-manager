/*!
 * Preference Manager (v1.1.6.20170318), http://tpkn.me/
 */

const fs = require('fs');
const path = require('path');

class PreferenceManager {
   constructor(){
      this.config_file = path.join(process.cwd(), "config.cfg");
   }

   /**
    * Load prefs
    * @return {Object}
    */
   load(){
      let data = {};
      if(fs.existsSync(this.config_file)){
         data = JSON.parse(fs.readFileSync(this.config_file, 'utf8'));
      }
      return data;
   }

   /**
    * Save prefs
    * @param  {Object} data
    */
   save(data){
      if(typeof data === 'undefined') throw new Error("No arguments were passed");
      if(Object.keys(data).length === 0) throw new Error("Data is too short");

      /**
       * Template for quick save
       */
      if(data && data._events && data._events.closed){
         data = {x: data.getPosition()[0], y: data.getPosition()[1], width: data.getSize()[0], height: data.getSize()[1]};
      }

      let save_data = data;
      if(fs.existsSync(this.config_file)){
         save_data = this.load();
         for (let i in data){
            save_data[i] = data[i];
         }
      }
      fs.writeFileSync(this.config_file, JSON.stringify(save_data));
   }
}

module.exports = new PreferenceManager;