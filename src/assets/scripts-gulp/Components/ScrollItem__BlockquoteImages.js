class ScrollItem__BlockquoteImages extends VScroll_Item {


  _tl;
  _totalImages;
  _images = [];

  _imagesP0;
  _imagesP1;
  _ul;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    this._ul = C.GetBy.class("__ul", this.item)[0];
    this._imagesP0 = 0;
    this._imagesP1 = -this._ul.offsetWidth - Metrics.WIDTH;

    if (!Basics.isTouch) {
      this.opts.offsetShow = Metrics.HEIGHT * 1.05;
    }

    this.onVisible = () => {
      this.imagesVisible(true);
    };

    this.onShow = () => {
      this._tl.restart();
      this.imagesVisible(true);
    };

    this.onHide = () => {
      //this._video.pause();
      this.imagesVisible(false);
    };

    this.onMove = (__position) => {
      let X = 0;

      if(!Basics.isTouch) {
        const ALPHA = Math.min(Maths.normalize(.01, .0, this.progressZero), Maths.normalize(.9, 1.0, this.progressZero));
        this.item.style.opacity = ALPHA;

        X = Maths.lerp(this._imagesP0, this._imagesP1, this.progressZero);
      } else {
        X = Maths.lerp(this._imagesP0, this._imagesP1, this.progress);
      }

      for(let i=0; i<this._totalImages; i++) {
        this._images[i].draw(
          {x:X,y:this._images[i].attributes.y},
          Maths.lerp(0.5, 1, this.progress),
          Scroll.speed * .01,
          1);
      }
    }

    this.setupImages();
    this.setupEstrobo();

    if(Basics.isSmartphone) {
      C.Remove(this._ul)
    }
  }

  setupImages() {

    const FIGURES = C.GetBy.selector("figure", this.item);
    this._totalImages = FIGURES.length;

    for(let i=0; i<this._totalImages; i++) {
      const IMG = C.GetBy.selector("img", FIGURES[i])[0];

      FIGURES[i].style[CSS.transform] = CSS.translate3D(0,Maths.maxminRandom(Metrics.HEIGHT * .5, Metrics.HEIGHT * -.5),-1);

      this._images.push(new Image3D(FIGURES[i],
        {
          src:  IMG.getAttribute("data-src"),
          width:  IMG.getAttribute("width"),
          height:  IMG.getAttribute("height"),
          x:this.x,
          y:Maths.maxminRandom(Metrics.HEIGHT, -Metrics.HEIGHT * .4),
          z:Maths.maxminRandom(0,-300)
        }));
    }
  }

  imagesVisible(__bol) {
    for(let i=0; i<this._totalImages; i++) {
      this._images[i].mesh.visible = __bol;
    }
  }

  setupEstrobo() {
    const SPLIT = new SplitText("#" + this.id + " .__t", {type:"words"});
    const ITEMS = Functions.arrayRandom(SPLIT.words);
    const TIME_ESTROBO = .01;
    const TIMES = Basics.isDebug? 30 : 30;
    let delay = 0;
    const DELAY_INC = 1/ITEMS.length;

    this._tl = gsap.timeline();
    this._tl.pause();

    for(let i=0; i<ITEMS.length; i++) {
      for(let j=0; j<TIMES; j++) {
        this._tl.to(ITEMS[i], {duration: 0, alpha: 0}, delay);
        delay += TIME_ESTROBO;
        this._tl.to(ITEMS[i], {duration: 0, alpha: 1}, delay);
        delay += TIME_ESTROBO;
      }

      this._tl.to(ITEMS[i], {duration: TIME_ESTROBO, color: "#FFFFFF"}, delay);

      for(let j=0; j<5; j++) {
        this._tl.to(ITEMS[i], {duration: TIME_ESTROBO, color: "#000000"}, delay);
        delay += TIME_ESTROBO;
        this._tl.to(ITEMS[i], {duration: TIME_ESTROBO, color: "#FFFFFF"}, delay);
        delay += TIME_ESTROBO;
      }

      /*delay -= TIME_ESTROBO;
      this._tl.to(ITEMS[i], {duration: TIME_ESTROBO, color: "#FFFFFF"}, delay);*/

      delay = 0 + DELAY_INC * (i+1);
    }
  }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  show() {
    super.show();
  }

  hide() {
    super.hide();
  }

  loop() {}

  resize(__w,__h) {

    if(!Basics.isTouch) {
      this._imagesP0 = 0;
      this._imagesP1 = -this._ul.offsetWidth - Metrics.WIDTH;


      this.opts.offsetShow = Metrics.HEIGHT * 1.05;
    }
    super.resize(__w, __h)
  }

  dispose() {
    super.dispose();
    /*this._slider1.dispose();
    gsap.ticker.remove(this._callLoop);*/
  }
}

Scroll._addClass("blockuote-images", ScrollItem__BlockquoteImages);