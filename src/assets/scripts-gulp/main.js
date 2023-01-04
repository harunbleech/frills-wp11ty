var Main = {
  page:new Default(),
  stage:new ThreeStage(),
  scrollbar:null,
  stats:null,
  mods:[],
  isArtist: C.GetBy.id("PageMain").getAttribute("data-page") === "artists",

  init: function() {
    Basics.id = "Frills.2.1";
    Basics.mainLang = "__";
    Basics.isDebug = document.body.classList.contains("__isDebug");
    Basics.hasCookies = false;
    CuchilloWorker.init();

    Metrics.update(true);
    //Functions.doMrCorrales();
   // Statics.init(C.GetBy.id("Interface"));

    LoaderController.add(new MediaLoader());

    Preloader.show(()=> {
      let nLoads = 0;
      const next = () => {
        nLoads++;
        if(nLoads === 2) {
          this.setup();
        }
      }

      LoaderController.init(()=> {next();});
      this.stage.init(()=> {next();});
    });
  },

  setup: function() {

    Keyboard.init();
    C.Ease.init();
    Interaction.init({ajax:false, drag:false, hasMove:true});

    Wrap.init();
    Cookies.init();
    Sidemenu.init();
    Acordions.init();
    Scroll.offsetAnchor = Sidemenu.container.offsetHeight * 1.55;

    this.scrollbar = new ScrollbarTimer(C.GetBy.id("Scrollbar"))

    if(Basics.isDebug) {
      gsap.ticker.add(() => {Main.loopDebug();});
    } else {
      gsap.ticker.add(() => {Main.loop();});
    }

    this.setupMods();

    this.page.init();
    this.page.show();
  },

  setupMods: function() {
    let bgActual = "--bg-black";
    const HEADER_TITLE = C.GetBy.class("__interface-title")[0];
    const MODS = {
      "data-mod-section": (item) => {
        const N_SECTION = Number(item.target.getAttribute("data-mod-section"));
        document.documentElement.style.setProperty('--section-actual', item.target.getAttribute("data-mod-section"));
        Sidemenu.setSection(N_SECTION);
      },

      "data-mod-bg": (item) => {
        document.body.classList.remove(bgActual);
        document.body.classList.add(item.target.getAttribute("data-mod-bg"));
        bgActual = item.target.getAttribute("data-mod-bg");
      }
    }

    function callback (entries, observer) {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          const MOD_TITLE = entry.target.getAttribute("data-mod-section");
          const MOD_BG = entry.target.getAttribute("data-mod-bg");

          if(MOD_TITLE) {
            MODS["data-mod-section"](entry);
          }

          if(MOD_BG) {
            MODS["data-mod-bg"](entry);
          }
        }
      });
    }

    const OPTIONS = {
      rootMargin: '0px',
      threshold: 0
    }

    let observer = new IntersectionObserver(callback, OPTIONS);
    C.Selector.forEach("[data-mod-section]", (el, i) => {
      observer.observe(el);
    });
    C.Selector.forEach("[data-mod-bg]", (el, i) => {
      observer.observe(el);
    });
  },

  resize: function() {
    //ControllerWindow.resize();
    Acordions.resize();
    Sidemenu.resize();
    this.stage.resize();

    Scroll.offsetAnchor = Sidemenu.container.offsetHeight * 1.55;
    Scroll.resize();
    Scroll.resize();
  },

  loop: function(__time, __delta, __frame) {
    if(Scroll.isScrolling) Scroll.loop();


    this.page.loop();
    this.stage.loop();
  },

  loopDebug: function(__time, __delta, __frame) {
   // Statics.begin();
    this.loop();
   // Statics.end();
  }
};

//READY?
if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
  Main.init();
} else {
  document.addEventListener('DOMContentLoaded', Main.init);
}
