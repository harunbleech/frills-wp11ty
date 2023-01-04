class ScrollItem__Footer extends VScroll_Item {

  _line = C.GetBy.class("__lineLogo")[0];

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    this.onVisible = () => {};

    gsap.set(this._line,{scaleX:1});

    this.onShow = () => {
      gsap.killTweensOf(this._line);
      gsap.to(this._line,{scaleX:1, ease:Power3.easeOut, duration:1, delay:1});
    };
    this.onHide = () => {
      gsap.killTweensOf(this._line);
      gsap.to(this._line,{scaleX:0, ease:Power3.easeOut, duration:1});
    };

    this.onMove = () => {}
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
  }
}

Scroll._addClass("footer", ScrollItem__Footer);