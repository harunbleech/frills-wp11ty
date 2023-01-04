class ScrollItem__Intro extends VScroll_Item {

  _title;
  _title1;
  _title2;
  //_title3;
  _tl;
  _callLoop;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    this._title = C.GetBy.class("__title", this.item)[0];
    this._title1 = C.GetBy.class("__h1", this.item)[0];
    this._title2 = C.GetBy.class("__h2", this.item)[0];
    /*this._title3 = C.GetBy.class("__h3", this.item)[0];
    this._title4 = C.GetBy.class("__h4", this.item)[0];*/


    gsap.set(this._title1,{alpha:0});
    gsap.set(this._title2,{alpha:0});
    /*gsap.set(this._title3,{alpha:0});
    gsap.set(this._title4,{alpha:0});*/


    const TIME_ESTROBO = .01;
    const TIMES = Basics.isDebug? 100 : 100;

    this._tl = gsap.timeline();
    this._tl.pause();

    let delay = 0;
    for(let i=0; i<TIMES; i++) {
      this._tl.to(this._title1, {duration:TIME_ESTROBO, alpha:1}, delay);
      delay += TIME_ESTROBO;
      this._tl.to(this._title1, {duration:TIME_ESTROBO, alpha:0}, delay);
      delay += TIME_ESTROBO;
    }

    /*for(let i=0; i<TIMES; i++) {
      this._tl.to(this._title2, {duration:TIME_ESTROBO, alpha:1}, delay);
      delay += TIME_ESTROBO;
      this._tl.to(this._title2, {duration:TIME_ESTROBO, alpha:0}, delay);
      delay += TIME_ESTROBO;
    }

    for(let i=0; i<TIMES; i++) {
      this._tl.to(this._title3, {duration:TIME_ESTROBO, alpha:1}, delay);
      delay += TIME_ESTROBO;
      this._tl.to(this._title3, {duration:TIME_ESTROBO, alpha:0}, delay);
      delay += TIME_ESTROBO;
    }*/

    for(let i=0; i<TIMES-1; i++) {
      this._tl.to(this._title2, {duration:TIME_ESTROBO, alpha:1}, delay);
      delay += TIME_ESTROBO;
      this._tl.to(this._title2, {duration:TIME_ESTROBO, alpha:0}, delay);
      delay += TIME_ESTROBO;
    }

    this._tl.to(this._title2, {duration:TIME_ESTROBO, alpha:1}, delay);
    delay += TIME_ESTROBO;
    this._tl.to(this._title2, {duration:TIME_ESTROBO, alpha:0, onComple:()=> {document.body.classList.remove("__presentation")}}, delay);

    ////
    const MOV = 40;
    const SPLIT = new SplitText("#" + this.id + " .__t", {type:"words"});
    for(let i=0; i<SPLIT.words.length; i++) {
      this._tl.from(SPLIT.words[i], {alpha:0, x:Maths.maxminRandom(MOV, -MOV), y:Maths.maxminRandom(MOV, -MOV), duration:1, ease:Power4.easeOut}, delay);
    }

    this.onVisible = () => {

    };

    this.onShow = () => {
      this._tl.play();
    };

    this.onHide = () => {};

    if(!Basics.isMobile) {
      this.onMove = () => {
        const ALPHA = Math.min(Maths.normalize(.2, 0, this.progress), Maths.normalize(.8, .9, this.progress));
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

Scroll._addClass("intro", ScrollItem__Intro);