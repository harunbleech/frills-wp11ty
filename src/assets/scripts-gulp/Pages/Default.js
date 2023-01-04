class Default {

  vinyl = C.GetBy.class("__vinyl")[0]? new Girarotutto(C.GetBy.class("__vinyl")[0]) : null;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor() {}

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  //SHOW
  init() {
    Scroll.init(Scroll.AXIS_Y, {smooth:!Basics.isSmartphone, multiplicator:1, hasSlowly:true});
    Scroll.setScrollbar(Main.scrollbar);
    Scroll.addAll();

    //Acordions.init();

    const resizeObserver = new ResizeObserver(entries => {
      console.log(entries)
      Scroll.resize();
    });

    this._resize_observer = new ResizeObserver(entries => {
      clearTimeout(this._timer);
      this._timer = setTimeout(()=>{
        Main.resize();
      },400);
    });
    this._resize_observer.observe(C.GetBy.class("wrap")[0]);

    /*resizeObserver.observe(C.GetBy.class("section-faq")[0]);
    C.GetBy.class("ul-faq")[0].classList.remove("__disabled")*/
    this.setupPutosBotonesArtistas();
  }

  setupPutosBotonesArtistas() {
    const btns = [...C.GetBy.class("__putoBotonBooking")];
    btns.map(item => {
      item.addEventListener("click", e => {
          e.preventDefault();
          e.stopPropagation();
          Basics.tempValue = item.getAttribute("data-src");
          WinMessage.show();
      });
    });
  }

  show(__call) {
    if(LoaderController._loaders.MediaLoader) LoaderController._loaders.MediaLoader.initBackground();

    const anchor = window.location.href.split("#")[1];

    Wrap.directShow();

    if(Main.isArtist) {
      document.body.classList.remove("__presentation");
      document.body.classList.add("__artists-list");
      document.body.classList.add("--bg-black")

      if(window.location.href.indexOf("#press") > -1) {
        const file = C.GetBy.id("PressKit").getAttribute("href");
        if(file)  window.location.href = file;
      }
    }
 
    if(Basics.isDebug) {
      setTimeout(()=>{
        Scroll.resize();
        Scroll.resize();
        Scroll.start();
        Scroll.show();

        if(anchor) {
          setTimeout(()=>{

            console.log("START TIME DEBUG")

            document.body.classList.remove("__presentation");
            try {
              Scroll.gotoAnchor(anchor.toLowerCase(), true)
            } catch (e) {
              console.log(e)
            }
            Scroll.resize();
          },250);

          }
        },100);
    } else {
      Preloader.hide(()=> {
        Scroll.resize();
        Scroll.start();
        Scroll.show();

        if(anchor) {
          setTimeout(()=>{

            console.log("START TIME")

            document.body.classList.remove("__presentation");
            try {
              Scroll.gotoAnchor(anchor.toLowerCase(), true)
            } catch (e) {
              console.log(e)
            }
            Scroll.resize();
          },250);
        }
      })
    }

    setTimeout(()=>{
      Scroll.resize();
    },2000);
  }

  loop() {
    if(this.vinyl) this.vinyl.loop(Scroll.speed);
  }

  resize() {
    super.resize();
    //Acordions.resize();
  }
}