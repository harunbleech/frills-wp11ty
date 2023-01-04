class ScrollbarTimer extends Scrollbar {
  isShow = false;
  isCounter = false;
  lblProgress;
  _time = 0;
  _timeScroll = 0;
  _currentTime = 0;

  _timesMenu = [];

  get time() { return this._time; }
  set time(__n) {
    this._time = Math.round(__n);

    let text = ""

    if(this._time < 10) {
      text = text + "000" + this._time;
    } else if(this._time < 100) {
      text = text + "00" + this._time;
    } else if(this._time < 1000) {
      text = text + "0" + this._time;
    } else {
      text = text + this._time;
    }

    this.lblProgress.textContent = text;
  }

  constructor() {
    super();
    this.lblProgress = C.GetBy.class("__progress-scroll")[0];
    this.update(0);
  }

  setCounter(__n, __is) {
    if(__is) this.isCounter = __is

    const DELAY = __is? 0 : .4;
    gsap.to(this, {time:__n, duration:.4, delay:DELAY, onComplete:()=> {
        this.isCounter = __is
      }});
  }

  update(__progress, __dom) {
    super.update(__progress);

    __dom = __dom? __dom : this.lblProgress;

    this._timeScroll = Math.round(Maths.lerp(41212, 0, this.progress));
    this._currentTime = Math.floor(this._timeScroll /60);

    const HOURS = Math.floor(this._timeScroll/3600);
    const MINS = Math.floor((this._timeScroll - (HOURS*3600))/60);
    const SECS = Math.floor(this._timeScroll - this._currentTime * 60);
    const CENTS = Math.floor((this._timeScroll - SECS - this._currentTime * 60) * 100);

    const sHOURS = HOURS<10? "0" + HOURS : HOURS.toString();
    const sMINS = MINS<10? "0" + MINS : MINS.toString();
    const sSECS = SECS<10? "0" + SECS : SECS.toString();
    const sCENTS = CENTS<10? "0" + CENTS : CENTS.toString();

    __dom.textContent = sHOURS + ":" + sMINS + ":" + sSECS;
  }

  resize() {
    super.resize();

    if(!Main.isArtist) {
      this.update(Math.max(0.01, 1 - Scroll.getAnchorProgress("our-codex")), C.GetBy.class("__our-codex__time")[0]);
      this.update(Math.max(0.01, 1 - Scroll.getAnchorProgress("what-is-frills")), C.GetBy.class("__what-is-frills__time")[0]);
      this.update(Math.max(0.01, 1 - Scroll.getAnchorProgress("our-services")), C.GetBy.class("__our-services__time")[0]);
      this.update(Math.max(0.01, 1 - Scroll.getAnchorProgress("our-principles")), C.GetBy.class("__our-principles__time")[0]);
      this.update(Math.max(0.01, 1 - Scroll.getAnchorProgress("our-team")), C.GetBy.class("__our-team__time")[0]);
      this.update(Math.max(0.01, 1 - Scroll.getAnchorProgress("contact")), C.GetBy.class("__contact__time")[0]);
    }
  }

  show(__d = 0) {}
  hide(__d = 0) {}
  end() {}
  dispose() {}
}