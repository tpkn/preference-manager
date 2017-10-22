/*!
 * Preference Manager (v1.2.1.20171022), http://tpkn.me/
 */

const fs = require('fs');
const path = require('path');

class PreferenceManager {
   constructor(config_path){
      if(typeof config_path === 'undefined'){
         let filename = new Buffer(process.argv[1]).toString('base64');
         // filename = filename.substr(0, filename.length / 2);
         config_path = path.join(process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local'), filename);
      }
      this.config_file = config_path;
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
      if(typeof data === 'undefined') throw new Error('No arguments were passed');
      if(Object.keys(data).length === 0) throw new Error('Data is too short');

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

module.exports = PreferenceManager;