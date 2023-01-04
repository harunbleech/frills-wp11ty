class Sidemenu extends _Sidemenu{

  static _tl;
  static posHide = 0;
  static btnToggle = C.GetBy.class("header__btn-sidemenu")[0];
  static bg = C.GetBy.class("__sidemenu-bg")[0];
  static scale = 0;
  static _links;
  static _actual;

  static init() {
    super.init();
    this.resize();
    this.directHide();


    this._tl = gsap.timeline();

    ///ANIM LINKS
    this._links = C.GetBy.class("__sidemenu-link");
  }

  static setSection(__n = 0) {
    if(this._actual) this._actual.classList.remove("__active");
    this._actual = this._links[__n];

    if(this._actual) {
      this._actual.classList.add("__active");
    }
  }

  static show__effect(__d = 0) {
    //this.container.setAttribute("aria-expanded", "true");

    this._tl.restart();

    gsap.to(this.container, {
      "--open": 1,
      duration:1,
      delay:0,
      ease: C.Ease.EASE_CUCHILLO_IN_OUT,
      onComplete:()=>{this.afterShow();},
    });

   /* gsap.to(this.btnToggle__bg, {
      scaleY: this.scale,
      duration:1,
      force3D:true,
      ease: C.Ease.EASE_CUCHILLO_IN_OUT
    });*/

    gsap.to(this.btnToggle, {
      y: this.posHide,
      duration:1,
      force3D:true,
      ease: C.Ease.EASE_CUCHILLO_IN_OUT
      //delay:1.1
    });

   /* gsap.to(this.btnToggle__bg, {
      scaleY: 0,
      duration:.5,
      force3D:true,
      ease: Power4.easeOut,
      delay:1.1
    });*/




    gsap.from(this.bg, {alpha:1, duration:.6, delay:.2, ease: Power2.easeOut});
  }

  static afterShow() {
    super.afterShow();
  }

  static directHide() {
    super.directHide();
  }

  static hide__effect(__d = 0) {
    //gsap.killTweensOf(this._bg);
    /*gsap.to(this._bg, {
      y:-this.height,
      duration:.8,
      ease:Expo.easeInOut,
      force3D:true,
      onComplete:()=>{this.afterHide();},
    });*/



    gsap.to(this.btnToggle, {
      y: 0,
      duration:1,
      force3D:true,
      ease: C.Ease.EASE_CUCHILLO_IN_OUT
    });


    gsap.to(this.container, {
      "--open": 0,
      duration:.9,
      delay:.1,
      ease: C.Ease.EASE_CUCHILLO_IN_OUT,
      onComplete:()=>{this.afterHide();},
    });
  }

  static afterHide() {
    super.afterHide();
  }

  static loop() {
    if(this.isOpen) {
      super.loop();
    }
  }
  static resize() {
    this.height = this.container.offsetHeight;
    this.posHide = this.height + this.container.offsetTop - this.btnToggle.offsetHeight - this.btnToggle.offsetTop;

    this.scale = (this.posHide + this.btnToggle.offsetHeight)/this.btnToggle.offsetHeight;


    if(this.isOpen) {
      gsap.set(this.btnToggle, {y: this.posHide, force3D:true});
    }

    super.resize();
  }
}


