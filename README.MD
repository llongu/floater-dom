# Floater-Dom

Dom element floating in the box in random direction  

## Installation
```
npm install --save floater-dom
```

### Usage
```js
import Floater from 'floater-dom'  
or  
const Floater = require('floater-dom')


//code 
const wrap = document.getElementById('wrap')
const moveBox = document.getElementById('moveBox')
const FloaterObj=new Floater({
    'dom':moveBox,
    "bodyW": wrap.clientWidth,
    "bodyH": wrap.clientHeight,
    'x':20,
    "y":20,
    speed:1 //default 0.5
})

FloaterObj.start()
// FloaterObj.end()
```

### [Example](https://github.com/llongu/floater-dom/blob/master/example.html)








