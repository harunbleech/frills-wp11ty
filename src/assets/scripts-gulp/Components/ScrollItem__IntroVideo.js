class ScrollItem__IntroVideo extends VScroll_Item {


  _title;
  _titleP0;
  _titleP1;
  _figure = C.GetBy.id("VideoIntro")
  _video = C.GetBy.selector("video", this._figure)[0];
  _tapa = C.GetBy.class("tapa", this._figure)[0];

  _videoP0;
  _videoP1;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    if(Basics.isSmartphone) {
      C.Remove(this._video)
      return;
    }

    this._title = C.GetBy.class("__title", this.item)[0];
    this._titleP0 = 0;
    this._titleP1 = -this._title.offsetWidth - Metrics.WIDTH;

    this._videoP0 = 0;
    this._videoP1 = -this._figure.offsetHeight - Metrics.HEIGHT;

    this.onVisible = () => {

    };

    /*this._callLoop = () => {
      this._slider1.loop();
    };*/

    this.onShow = () => {
      this._video.play();
      this._figure.classList.remove("--hide");
    };

    this.onHide = () => {
      
      this._video.pause();
      this._figure.classList.add("--hide");
      //gsap.ticker.remove(this._callLoop);
    };

    this.onMove = () => {

      if(!Basics.isTouch) {
        const Y = Maths.lerp(this._videoP0, this._videoP1, this.progress);
        this._figure.style[CSS.transform] = CSS.translate3D(0, Y, -1);

        const X = Maths.lerp(this._titleP0, this._titleP1, this.progressZero);
        this._title.style[CSS.transform] = CSS.translate3D(X, 0, 0);
      }

      const ALPHA = Math.min(Maths.normalize(.2, .1, this.progress), Maths.normalize(.8, .9, this.progress));
      this._tapa.style.opacity = Maths.lerp(1, 0, ALPHA);
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

    if(!Basics.isSmartphone) {


      this._titleP0 = 0;
      this._titleP1 = -this._title.offsetWidth - Metrics.WIDTH;

      this._videoP0 = 0;
      this._videoP1 = -(this._figure.offsetHeight - Metrics.HEIGHT);
    }

    super.resize(__w, __h)
  }

  dispose() {
    super.dispose();
    /*this._slider1.dispose();
    gsap.ticker.remove(this._callLoop);*/
  }
}

Scroll._addClass("intro-video", ScrollItem__IntroVideo);