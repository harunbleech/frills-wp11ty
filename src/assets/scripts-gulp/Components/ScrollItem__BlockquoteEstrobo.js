class ScrollItem__BlockquoteEstrobo extends VScroll_Item {


  _tl;
  _holder;
  _timelines = [];
  _pEffect0;
  _pEffect1;
  _step;
  _next = 0;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    this._holder = C.GetBy.class("holder-content", this.item)[0];

    if(!Basics.isTouch) {
      this.opts.offsetShow = Metrics.HEIGHT * .5;
    }

    if(Basics.isMobile) {
      this.setupMobile();
      return;
    }
    ////
    const SPLIT = new SplitText("#" + this.id + " .__t", {type:"words"});
    const ITEMS = Functions.arrayRandom(SPLIT.words);
    const TIME_ESTROBO = .01;
    const TIMES = Basics.isDebug? 30 : 30;
    let delay = 0;
    const DELAY_INC = 1/ITEMS.length;

    this._tl = gsap.timeline();
    this._tl.pause();

    for(let i=0; i<ITEMS.length; i++) {
      delay = 0;
      const TL = gsap.timeline();
      TL.pause();

      for(let j=0; j<TIMES; j++) {
        TL.to(ITEMS[i], {duration: 0, alpha: 0}, delay);
        delay += TIME_ESTROBO;
        TL.to(ITEMS[i], {duration: 0, alpha: 1}, delay);
        delay += TIME_ESTROBO;
      }

      TL.to(ITEMS[i], {duration: TIME_ESTROBO, color: "#FFFFFF"}, delay);

      for(let j=0; j<5; j++) {
        TL.to(ITEMS[i], {duration: TIME_ESTROBO, color: "#fa5117"}, delay);
        delay += TIME_ESTROBO;
        TL.to(ITEMS[i], {duration: TIME_ESTROBO, color: "#FFFFFF"}, delay);
        delay += TIME_ESTROBO;
      }

      this._timelines.push(TL);


      /*delay -= TIME_ESTROBO;
      this._tl.to(ITEMS[i], {duration: TIME_ESTROBO, color: "#FFFFFF"}, delay);*/

      delay = 0 + DELAY_INC * (i+1);
    }

    this._step = 1/this._timelines.length;

    this.onVisible = () => {

    };

    /*this._callLoop = () => {
      this._slider1.loop();
    };*/

    this.onShow = () => {
      //this._tl.restart();
      //this._timelines[0].restart();
    };

    this.onHide = () => {
      //this._tl.reverse();
    };

    if(!Basics.isMobile) {
      this.onMove = (__position) => {

        const PROGRESS = this.progressZero;

        if(Scroll.direction === 1) {
          if (this._next * this._step <= PROGRESS && this._next < this._timelines.length) {
            this._timelines[this._next].restart();
            this._next++;
          }
        } else if(Scroll.direction === -1) {
          if (this._next * this._step >= PROGRESS && this._next > 0) {
            this._next--;
            this._timelines[this._next].reverse();
          }
        }

        if(this.progressZero <= 1) {
          this._holder.style[CSS.transform] = CSS.translate3D(0, __position.y * -1, 0);
        }

        const ALPHA = Math.min(Maths.normalize(.0, -.1, this.progress), Maths.normalize(.9, 1.0, this.progress));
        this.item.style.opacity = ALPHA;
      }
    }


  }

  setupMobile() {
    ////
    this.onShow = () => {
      this._tl.restart();
    };

    this.onHide = () => {
      this._tl.reverse();
    };

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
        this._tl.to(ITEMS[i], {duration: TIME_ESTROBO, color: "#fa5117"}, delay);
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
    /*this._titleP0 = 0;
    this._titleP1 = -this._title.offsetWidth - Metrics.WIDTH;

    this._videoP0 = 0;
    this._videoP1 = -(this._figure.offsetHeight - Metrics.HEIGHT);*/

    if(!Basics.isTouch) {
      this.opts.offsetShow = Metrics.HEIGHT * .5;
    }
    super.resize(__w, __h)
  }

  dispose() {
    super.dispose();
    /*this._slider1.dispose();
    gsap.ticker.remove(this._callLoop);*/
  }
}

Scroll._addClass("blockuote-estrobo", ScrollItem__BlockquoteEstrobo);