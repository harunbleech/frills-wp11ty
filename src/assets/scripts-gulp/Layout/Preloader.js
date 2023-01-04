class Preloader extends _Preloader {
    static enabled = true;
    static _isPossible = false;
    static _isLoaded = false;
    static _callbackStart;

    static init() {}
    static beforeShow() {}
    static show__effect() {
      if(!Basics.isDebug) {
        this._isPossible = true;
        setTimeout(()=> {this.afterShow();},500);
      } else {
        this.hide__effect();
      }
    }

    static afterShow() {
      super.afterShow();
    }

    static beforeHide() {}
    static hide__effect() {
      if(!Basics.isDebug) {
        gsap.to(this.container,{alpha:0, duration:.2, delay:0, ease:Quad.easeInOut, onComplete:this.afterHide.bind(this)});
      } else {
        this.afterHide();
      }
    }

    static afterHide() {
      this.enabled = false;
      this._isPossible = false;
      this._isLoaded = false;
      super.afterHide();
    }

    static progress__effect() {}
}

