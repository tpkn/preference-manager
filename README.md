# Preference Manager
Save your Electron app setting to a local file

Quick save and load app window settings with a single line of code. Auto-remove empty settings and many more features. 
Module works both in main and render processes.


## Installation
```bash
npm install preference-manager
```



### Quick save window params `{x, y, width, height}`
```javascript
const pm = require('preference-manager');

app.on('ready', function(){
   win.on('close', function(){
      pm.quicksave();
   });
});
```

### Load and apply settings to the window
```javascript
app.on('ready', function(){
   pm.quickload();
});
```


### Save custom settings
```javascript
pm.save({a: 1, b: 2, c: {d: 3}});
```


### Save settings and remove `empty` ones
```javascript
pm.save({a: null, b: 2, c: {d: null}, d: new Date}, true);
// => {b: 2, d: "2011-02-15T11:22:40.263Z"}
```


### Load
```javascript
pm.load();
// => {a: 1, b: 2, c: {d: 3}}
```


### Delete all
```javascript
pm.flush();
// => {}
```


### List all settings (with `beautify = true`)
```javascript
pm.list(true);
/*
   { 
      a: 1, 
      b: 2, 
      c: {
         d: 3
      }
   }
*/
```

### Get settings file
```javascript
pm.file;
//=> C:\Users\me\AppData\Roaming\app\.settings
```


## Changelog 
#### 2018-03-15:
- v2.0.2 Now `quickload` method will never position your app outside the screen bounds (if, for example, you disabled the second monitor, where was your app on)

#### 2018-03-04:
- v2.0.1 Fixed bug, when app trying to save setting but app's `userData` folder does not exist yet

#### 2018-02-13:
- v2.0.0 Rewritten from ground up. Added few more stuff to manage your settings

