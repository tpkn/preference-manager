
### Save
```javascript
pm.save({x: 123, y: 456, width: 800, height: 600, godmod: true});
```
<br />

### Quick save
This is 'lazy' method. Out of the box it saves four default params `{x, y, width, height}`. Link to current `BrowserWindow` is required!
```javascript
pm.save(BrowserWindow);
```
<br />

### Load
```javascript
var prefs = pm.load();
if(prefs.hasOwnProperty('x') && prefs.hasOwnProperty('y')){
    win.setPosition(prefs.x, prefs.y);
}
if(prefs.hasOwnProperty('width') && prefs.hasOwnProperty('height')){
    win.setSize(prefs.width, prefs.height);
}
```
