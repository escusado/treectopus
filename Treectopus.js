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

  this.colorScale = chroma.scale([ '#B1EB00', '#92DCE0', '#FF85CB', '#FF432E', '#FFAC00', '#775BA3', '#91C5A9', '#F8E1B4', '#F98A5F', '#0C98CF', '#91C5A9']).mode('lab');

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
    Object.keys(this.layers).forEach(function(layerName, i){
      var layerUrl = this.layers[layerName],
          texture = PIXI.Texture.fromImage(layerUrl),
          sprite = new PIXI.Sprite(texture),
          scale = 0.8;


      sprite.scale.x = sprite.scale.y = scale;
      sprite.anchor.x = (sprite.width/2)*scale;
      sprite.anchor.y = 0;
      sprite.position.x = (this.size.w/2)*scale;
      sprite.position.y = 0;
      sprite.tint = 0xFFFFFF;

      if(layerName === 'outline'){
        sprite.tint = 0x000000;
      }

      this.currentColorDeltas[layerName] = i/Object.keys(this.layers).length;

      texture.baseTexture.on('loaded', function(ev){
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

      this.currentColorDeltas[layerName] += this.dt/10000;

      if(this.currentColorDeltas[layerName] > 1){
        this.currentColorDeltas[layerName] = 1-this.currentColorDeltas[layerName];
      }

      this.sprites[layerName].tint = this.colorScale( this.currentColorDeltas[layerName] ).num();
    }, this);
  };

  this.init();

};