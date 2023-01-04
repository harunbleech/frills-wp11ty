class FilmDetail extends Default {

  _player;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor() {
    super();

    this._player = new PlayerVideo(C.GetBy.class("player-video", this.container)[0]);
    this.addDispose(()=> {this._player.dispose();});
  }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  //SHOW
  beforeShow() {
   super.beforeShow();
  }

  _show() {
    this.show__effect();
  }

  show__effect() {
    super.show__effect();
    Header.showDetail();
    Breadcrumb.hide();

    setTimeout(()=> {
      document.body.classList.add("__invertMode");
      this._player.load();
    },1000);
  }

  afterShow() {
    super.afterShow();
  }

  beforeHide() {
    this._player.stop();
  }

  afterHide() {
    Header.hideDetail();
    document.body.classList.remove("__invertMode");
    super.afterHide();
  }

  //RESIZE
  resize() {
    if(this._isActive) {
      super.resize();
    }
  }

  //LOOP
  loop() {
    if(this._isActive) {
      this._player.loop();
      super.loop();
    }
  }
}