# preference-manager

Save your app prefs into local config file


### Usage
```javascript
const PreferenceManager = require('preference-manager');

// Manual path: C:\Users\username\Desktop\node-test\.config-my-lalala
let pm = new PreferenceManager(path.join(process.cwd(), '.config-my-lalala'));

// If path is not set, module create config file based on your app.js file path in base64 format:
// C:\Users\username\AppData\Roaming\QzpcVXNlcnNcbGFsYWxhXERlc2t0
// let pm = new PreferenceManager();
```


### Save
```javascript
pm.save({x: 123, y: 456, width: 800, height: 600, godmod: true});
```

### Quick save
This is 'lazy' method. Out of the box it saves four default params `{x, y, width, height}`. Link to current `BrowserWindow` is required!
```javascript
pm.save(BrowserWindow);
```

### Load
```javascript
var prefs = pm.load();
if(prefs.x && prefs.y){
    win.setPosition(prefs.x, prefs.y);
}
if(prefs.width && prefs.height){
    win.setSize(prefs.width, prefs.height);
}
```