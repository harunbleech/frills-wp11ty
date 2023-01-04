class ScrollItem__SliderVideo__SliderItem extends Slider_Item{
  _figure;
  _video;
  _tl;
  _p;
  id;

  constructor(__item, __index, __slider) {
    super(__item, __index, __slider);

    this._figure = C.GetBy.class("__video", this.item)[0];
    this._p = C.GetBy.class("__p", this.item)[0];
    this._video = C.GetBy.selector("video", this._figure)[0];

    gsap.set(this.item,{alpha:0});

    ///ESTROBO
    ////
    this.id = Functions.getId(this.item);

    const SPLIT = new SplitText("#" + this.id + " .__t", {type:"lines", linesClass:this.id});
    const ITEMS = C.GetBy.class(this.id, this.item);
    const TIME_ESTROBO = .01;
    const TIMES = Basics.isDebug? 30 : 30;
    let delay = .4;
    const DELAY_INC = 1/ITEMS.length;

    this._tl = gsap.timeline();
    this._tl.pause();

    //gsap.set(this._p, {alpha: 0});

    for(let i=0; i<ITEMS.length; i++) {
      gsap.set(ITEMS[i], {alpha: 0});
      this._tl.to(ITEMS[i], {duration: .5 + (.5 * i), alpha: 1, ease:Power2.easeOut}, delay);

      delay += .01;
    }
  }
  show(__d = 1) {
    super.show();
    this._video.play();
    this._tl.restart();
    gsap.to(this.item,{alpha:1, duration:.2, ease:Power2.easeOut});
  }
  hide(__d = 1) {
    super.afterHide();
    gsap.to(this.item,{alpha:0, duration:.2, ease:Power2.easeIn, onComplete:()=> {this.afterHide()}});
  }

  afterHide() {
    if(this._video) this._video.pause();
    super.afterHide();
  }
}

class ScrollItem__SliderVideo extends VScroll_Item {


  _slider;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    this._slider = new Slider(C.GetBy.class("__slider", this.item)[0], ScrollItem__SliderVideo__SliderItem);

    this.onVisible = () => {

    };


    this.onShow = () => {
      this._slider.goto(0);
    };

    this.onHide = () => {
      this._slider.hide();
    };

    if(!Basics.isTouch) {
      this.onMove = () => {
        const ALPHA = Math.min(Maths.normalize(.1, .0, this.progressZero), 1/*Maths.normalize(.9, 1.0, this.progressZero)*/);
        this.item.style.opacity = ALPHA;
      }
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
    super.resize(__w, __h)
  }

  dispose() {
    super.dispose();
  }
}

Scroll._addClass("slider-video", ScrollItem__SliderVideo);