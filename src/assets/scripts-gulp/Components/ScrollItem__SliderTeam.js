class ScrollItem__SliderTeam extends VScroll_Item {

  _slider1;
  _callLoop;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    //this._slider1 = new SliderScroll(C.GetBy.class("__slider", this._item)[0], {smooth:false,interactive:false});

    this.onVisible = () => {

    };

    /*this._callLoop = () => {
      this._slider1.loop();
    };*/

    this.onShow = () => {
      ///gsap.ticker.add(this._callLoop);
    };

    this.onHide = () => {
      //gsap.ticker.remove(this._callLoop);
    };

    this.onMove = () => {
      //console.log(this.progress, this.progressZero);

      //const ALPHA = Math.min(Maths.normalize(.9, 2, this.progressZero), Maths.normalize(0, -1.5, this.progressZero));
      //const ALPHA = Math.min(Maths.normalize(.2, .1, this.progress), Maths.normalize(.8, .9, this.progress));
      //this.item.style.opacity = ALPHA;

      //this._slider1.goto_percetage(Math.max(0, Math.min(1,this.progressZero)), true);
      //this._slider1.goto_percetage(this.progress, true);
      //this._slider2.goto_percetage(1 - Math.max(0, Math.min(1,this.progress)), true);
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
    super.resize(__w, __h)
  }

  dispose() {
    super.dispose();
    /*this._slider1.dispose();
    gsap.ticker.remove(this._callLoop);*/
  }
}

Scroll._addClass("slider-team", ScrollItem__SliderTeam);