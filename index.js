var SimplexNoise = require('simplex-noise')
var Alea = require('alea')
var voxel = require('voxel')

module.exports = function generate(opts) {
  if (!opts) opts = {}
  if (typeof opts === 'string') opts = {seed: opts}
  var seed = opts.seed || Math.random()
  var alea = new Alea(seed)
  function seedFunc() { return alea() }
  var simplex = new SimplexNoise(seedFunc)
  var chunkDistance = opts.chunkDistance || 2
  var chunkSize = opts.chunkSize || 32
  var scaleFactor = opts.scaleFactor || chunkDistance * chunkSize

  var width = chunkDistance * 2 * chunkSize
  var lowerLeft = [0, 0]
  var upperRight = [width, width]
  
  getMaterialIndex = opts.getMaterialIndex || getMaterialIndex
  
  return function getChunk(l, h) {
    var fromLow = chunkSize * -chunkDistance
    var fromHigh = chunkSize * chunkDistance
    var toLow = lowerLeft[0]
    var toHigh = upperRight[0]
    return voxel.generate(l, h, function(x, y, z, n) {
      return getMaterialIndex(seed, simplex, width, x, y, z)
    })
  }
}

function getMaterialIndex(seed, simplex, width, x, y, z) {
  // the contents of this function come from 
  // https://github.com/jwagner/voxelworlds/
  var xd = x-width*0.25,
      yd = y-width*0.20,
      zd = z-width*0.25;
  if(yd > 0) yd *= yd*0.05;
  var xz = simplex.noise2D(x, z);
  var distance = (xd*xd+yd*yd*32+zd*zd)*0.0004,
      density = simplex.noise3D(x/32, y/32, z/32)-distance;
  if(density > -0.75){
      return 3;
  }
  if(density > -0.85){
      return 2;
  }
  if(density > -1.0){
      return y > 32+xz*4 ? 1 : 2;
  }
  if(seed[0] === "6"){
  var density0 = simplex.noise3D(x/32, 32, z/32);
      if(density0-xd*xd*0.002-zd*zd*0.002 > -1.0 && y > 32 && y*0.01 < simplex.noise2D(x/4, z/4)*simplex.noise2D(x/32, z/32)){
      return y > 48+xz*16 ? 5 : 4;
  }
  }
  if(seed[0] != '0'){
      if(density > -0.50-y*0.01+simplex.noise2D(x/4, z/4)*simplex.noise2D(x/32+5, z/32+5)){
          return 3;
      }
  }

  return 0.0;
}

function scale( x, fromLow, fromHigh, toLow, toHigh ) {
  return ( x - fromLow ) * ( toHigh - toLow ) / ( fromHigh - fromLow ) + toLow
}
;