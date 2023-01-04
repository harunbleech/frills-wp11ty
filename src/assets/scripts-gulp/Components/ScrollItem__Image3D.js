class ScrollItem__Image3D extends VScroll_Item {


  _title;
  _titleP0;
  _titleP1;

  _image3D;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    //this._title = C.GetBy.class("__title", this.item)[0];

    if(Basics.isSmartphone) return;

    const FIGURE = C.GetBy.class("media-holder", this.item)[0];
    const IMG = C.GetBy.selector("img", FIGURE)[0];

    this._image3D = new Image3D(FIGURE,
      {
        src:  IMG.getAttribute("data-src"),
        width:  IMG.getAttribute("width"),
        height:  IMG.getAttribute("height"),
        x:this.x,
        y:this.y,
        z:0
      });

    this.onVisible = () => {
      this._image3D.mesh.visible = true;
    };

    this.onShow = () => {
      this._image3D.mesh.visible = true;
      ///gsap.ticker.add(this._callLoop);
    };

    this.onHide = () => {
      this._image3D.mesh.visible = true;
      //gsap.ticker.remove(this._callLoop);
    };

    this.onMove = (__position) => {

      const ALPHA = Math.min(Maths.normalize(.3, .0, this.progress), Maths.normalize(.8, 1, this.progress));

      this._image3D.draw(
        __position, Maths.lerp(0.5, 1, this.progress),
        Scroll.speed * .01,
        ALPHA);


      //const X = Maths.lerp(this._titleP0, this._titleP1, this.progressZero);
      //this._title.style[CSS.transform] = CSS.translate3D(X,0,0);
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
    this._titleP0 = 0;
    this._image3D.resize();
    //this._titleP1 = -this._title.offsetWidth - Metrics.WIDTH;
    super.resize(__w, __h)
  }

  dispose() {
    super.dispose();
    /*this._slider1.dispose();
    gsap.ticker.remove(this._callLoop);*/
  }
}

Scroll._addClass("image-3D", ScrollItem__Image3D);