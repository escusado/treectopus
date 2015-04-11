var Treectopus = function(){

  this.stage = null;
  this.renderer = null;

  this.time = new Date().getTime();
  this.dt = 0;

  this.currentColorDeltas = {};

  this.size = {
    w : window.innerWidth,
    h : window.innerHeight
  };

  this.layers = {
    sky       : "./img/sky.png?r="+Date.now(),
    grass     : "./img/grass.png?r="+Date.now(),
    trunk     : "./img/trunk.png?r="+Date.now(),
    bird      : "./img/bird.png?r="+Date.now(),
    eyes      : "./img/eyes.png?r="+Date.now(),
    leavesIn  : "./img/leavesIn.png?r="+Date.now(),
    leavesRim : "./img/leavesRim.png?r="+Date.now(),
    peach     : "./img/peach.png?r="+Date.now(),
    outline   : "./img/outline.png?r="+Date.now()
  };

  this.sprites = {};

  this.colorScales = JSON.parse('[["rgb(250, 105, 0)","rgb(105, 210, 231)","rgb(167, 219, 216)","rgb(224, 228, 204)","rgb(243, 134, 48)","rgb(250, 105, 0)"],["rgb(250, 105, 0)","rgb(105, 210, 231)","rgb(167, 219, 216)","rgb(224, 228, 204)","rgb(243, 134, 48)","rgb(250, 105, 0)"],["rgb(131, 175, 155)","rgb(254, 67, 101)","rgb(252, 157, 154)","rgb(249, 205, 173)","rgb(200, 200, 169)","rgb(131, 175, 155)"],["rgb(131, 175, 155)","rgb(254, 67, 101)","rgb(252, 157, 154)","rgb(249, 205, 173)","rgb(200, 200, 169)","rgb(131, 175, 155)"],["rgb(83, 119, 122)","rgb(236, 208, 120)","rgb(217, 91, 67)","rgb(192, 41, 66)","rgb(84, 36, 55)","rgb(83, 119, 122)"],["rgb(83, 119, 122)","rgb(236, 208, 120)","rgb(217, 91, 67)","rgb(192, 41, 66)","rgb(84, 36, 55)","rgb(83, 119, 122)"],["rgb(11, 72, 107)","rgb(207, 240, 158)","rgb(168, 219, 168)","rgb(121, 189, 154)","rgb(59, 134, 134)","rgb(11, 72, 107)"],["rgb(11, 72, 107)","rgb(207, 240, 158)","rgb(168, 219, 168)","rgb(121, 189, 154)","rgb(59, 134, 134)","rgb(11, 72, 107)"],["rgb(196, 77, 88)","rgb(85, 98, 112)","rgb(78, 205, 196)","rgb(199, 244, 100)","rgb(255, 107, 107)","rgb(196, 77, 88)"],["rgb(196, 77, 88)","rgb(85, 98, 112)","rgb(78, 205, 196)","rgb(199, 244, 100)","rgb(255, 107, 107)","rgb(196, 77, 88)"],["rgb(197, 224, 220)","rgb(119, 79, 56)","rgb(224, 142, 121)","rgb(241, 212, 175)","rgb(236, 229, 206)","rgb(197, 224, 220)"],["rgb(197, 224, 220)","rgb(119, 79, 56)","rgb(224, 142, 121)","rgb(241, 212, 175)","rgb(236, 229, 206)","rgb(197, 224, 220)"],["rgb(3, 22, 52)","rgb(232, 221, 203)","rgb(205, 179, 128)","rgb(3, 101, 100)","rgb(3, 54, 73)","rgb(3, 22, 52)"],["rgb(3, 22, 52)","rgb(232, 221, 203)","rgb(205, 179, 128)","rgb(3, 101, 100)","rgb(3, 54, 73)","rgb(3, 22, 52)"],["rgb(245, 105, 145)","rgb(209, 242, 165)","rgb(239, 250, 180)","rgb(255, 196, 140)","rgb(255, 159, 128)","rgb(245, 105, 145)"],["rgb(245, 105, 145)","rgb(209, 242, 165)","rgb(239, 250, 180)","rgb(255, 196, 140)","rgb(255, 159, 128)","rgb(245, 105, 145)"],["rgb(138, 155, 15)","rgb(73, 10, 61)","rgb(189, 21, 80)","rgb(233, 127, 2)","rgb(248, 202, 0)","rgb(138, 155, 15)"],["rgb(138, 155, 15)","rgb(73, 10, 61)","rgb(189, 21, 80)","rgb(233, 127, 2)","rgb(248, 202, 0)","rgb(138, 155, 15)"],["rgb(229, 252, 194)","rgb(89, 79, 79)","rgb(84, 121, 128)","rgb(69, 173, 168)","rgb(157, 224, 173)","rgb(229, 252, 194)"],["rgb(229, 252, 194)","rgb(89, 79, 79)","rgb(84, 121, 128)","rgb(69, 173, 168)","rgb(157, 224, 173)","rgb(229, 252, 194)"],["rgb(237, 201, 81)","rgb(0, 160, 176)","rgb(106, 74, 60)","rgb(204, 51, 63)","rgb(235, 104, 65)","rgb(237, 201, 81)"],["rgb(237, 201, 81)","rgb(0, 160, 176)","rgb(106, 74, 60)","rgb(204, 51, 63)","rgb(235, 104, 65)","rgb(237, 201, 81)"],["rgb(244, 234, 213)","rgb(233, 78, 119)","rgb(214, 129, 137)","rgb(198, 164, 154)","rgb(198, 229, 217)","rgb(244, 234, 213)"],["rgb(244, 234, 213)","rgb(233, 78, 119)","rgb(214, 129, 137)","rgb(198, 164, 154)","rgb(198, 229, 217)","rgb(244, 234, 213)"],["rgb(153, 178, 183)","rgb(217, 206, 178)","rgb(148, 140, 117)","rgb(213, 222, 217)","rgb(122, 106, 83)","rgb(153, 178, 183)"],["rgb(153, 178, 183)","rgb(217, 206, 178)","rgb(148, 140, 117)","rgb(213, 222, 217)","rgb(122, 106, 83)","rgb(153, 178, 183)"],["rgb(255, 61, 127)","rgb(63, 184, 175)","rgb(127, 199, 175)","rgb(218, 216, 167)","rgb(255, 158, 157)","rgb(255, 61, 127)"],["rgb(255, 61, 127)","rgb(63, 184, 175)","rgb(127, 199, 175)","rgb(218, 216, 167)","rgb(255, 158, 157)","rgb(255, 61, 127)"],["rgb(203, 232, 107)","rgb(255, 255, 255)","rgb(203, 232, 107)","rgb(242, 233, 225)","rgb(28, 20, 13)","rgb(203, 232, 107)"],["rgb(203, 232, 107)","rgb(255, 255, 255)","rgb(203, 232, 107)","rgb(242, 233, 225)","rgb(28, 20, 13)","rgb(203, 232, 107)"]]');

  this.layerColorScales = {};

  this.colorScales.forEach(function(scaleArray, i){
    this.colorScales[i] = chroma.scale(scaleArray).mode('lab');
  }, this);

  this.init = function init(){
    // create an new instance of a pixi stage
    this.stage = new PIXI.Stage(0x333333);

    // create a renderer instance.
    this.renderer = PIXI.autoDetectRenderer(this.size.w, this.size.h);

    // add the renderer view element to the DOM
    document.body.appendChild(this.renderer.view);

    requestAnimFrame( this.animate.bind(this) );

    this.setup();
  };

  this.animate = function animate() {
    var now = new Date().getTime();
    this.dt = now - (this.time || now);
    this.time = now;

    requestAnimFrame( this.animate.bind(this) );
    this.update();
    this.renderer.render(this.stage);
  };

  this.setup = function setup(){
    Object.keys(this.layers).forEach(function layerIterator(layerName, i){
      var layerUrl = this.layers[layerName],
          texture = PIXI.Texture.fromImage(layerUrl),
          scale = 0.8;

      texture.baseTexture.on('loaded', function loadedHandler(ev){
        var sprite = new PIXI.Sprite(texture);

        sprite.anchor.x = 0;
        sprite.anchor.y = 0;
        sprite.scale.x = sprite.scale.y = scale;
        sprite.position.x = ((this.size.w-(sprite.width*scale))/2);
        sprite.position.y = ((this.size.h-(sprite.height*scale))/2)/2;
        sprite.tint = 0xFFFFFF;

        if(layerName === 'outline'){
          sprite.tint = 0x000000;
        }

        this.currentColorDeltas[layerName] = i/Object.keys(this.layers).length;
        this.layerColorScales[layerName] = this.colorScales[Math.floor(Math.random()*this.colorScales.length)];

        this.sprites[layerName] = sprite;
        this.tryToRender(ev);
      }.bind(this));

    }, this);
  };

  this.tryToRender = function tryToRender(ev){
    if(Object.keys(this.sprites).length === Object.keys(this.layers).length){
      Object.keys(this.sprites).forEach(function(spriteName){
        var currentSprite = this.sprites[spriteName];
        this.stage.addChild(currentSprite);
      }, this);
    }
  };

  this.update = function update(){
    Object.keys(this.currentColorDeltas).forEach(function(layerName, i){
      if(layerName === 'outline'){
        return;
      }

      this.currentColorDeltas[layerName] += this.dt/5000;

      if(this.currentColorDeltas[layerName] > 1){
        this.currentColorDeltas[layerName] = this.currentColorDeltas[layerName] - 1;
      }

      this.sprites[layerName].tint = this.layerColorScales[layerName]( this.currentColorDeltas[layerName] ).num();
    }, this);
  };

  this.init();

};

/*
var buff = [];
$('.palette').each(function(i,el){
  var color,
      curr = [];
  $(el).find('.c').each(function(i,el2){
    color = $(el2).css('background-color');
    curr.push(color);
  })
  curr.unshift(color);
  if(curr.length>0 && color) buff.push(curr);
});
console.log(JSON.stringify(buff));
*/