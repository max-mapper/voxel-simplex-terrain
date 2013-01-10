# voxel-simplex-terrain

generate voxel terrain using [simplex noise](http://en.wikipedia.org/wiki/Simplex_noise)

uses the awesome [simplex-noise](https://github.com/jwagner/simplex-noise.js) library from @jwagner

this is designed to work out of the box with [voxel-engine](https://npmjs.org/package/voxel-engine)

## install

`npm install voxel-simplex-terrain`

## api

```javascript
var terrain = require('voxel-simplex-terrain')

// initialize your noise, returns a function
var chunkSize = 32
var chunkDistance = 2
var generator = terrain(chunkDistance, chunkSize)

// the returned function is for getting specific chunks
var chunkData = generator([0,0,0], [32,32,32])
```

chunk data is returned in the format of the [voxel](https://npmjs.org/package/voxel) module

## license

BSD
