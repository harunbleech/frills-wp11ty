class ScrollItem__Services extends VScroll_Item {

  _img = C.GetBy.class("vinyl-holder")[0];

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);


    TweenLite.set(this._img.parentNode.parentNode, {perspective:800});
    TweenLite.set(this._img.parentNode, {transformStyle:"preserve-3d"});
        

    gsap.set(this._img,{x:-Metrics.WIDTH,y:Metrics.HEIGHT*.5,rotationY:90,force3D:true});
    this.opts.offsetShow = Metrics.HEIGHT * .8;

    this.onVisible = () => {};
    this.onShow = () => {
      gsap.killTweensOf(this._img);
      gsap.set(this._img,{x:-Metrics.WIDTH,y:Metrics.HEIGHT*.5,rotationY:90,force3D:true});
      gsap.to(this._img,{x:0, y:0, ease:Expo.easeOut, duration:1,rotationY:0,force3D:true});

    };
    this.onHide = () => {
      gsap.killTweensOf(this._img);
      gsap.to(this._img,{x:-Metrics.WIDTH, y:Metrics.HEIGHT*.5, rotationY:90, ease:Power2.easeIn, duration:.4,force3D:true});
    };

    this.onMove = () => {

      //console.log(this.progress, this.progressZero)

      //const ALPHA = Math.min(Maths.normalize(.2, .1, this.progress), Maths.normalize(.8, .9, this.progress));
      //this._img.style.opacity = ALPHA;
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
    /*if(this._slider1) {
      this._slider1.resize();
    }*/
    this.opts.offsetShow = Metrics.HEIGHT * .8;
    super.resize(__w, __h)
  }

  dispose() {
    super.dispose();
    /*this._slider1.dispose();
    gsap.ticker.remove(this._callLoop);*/
  }
}

Scroll._addClass("services", ScrollItem__Services);