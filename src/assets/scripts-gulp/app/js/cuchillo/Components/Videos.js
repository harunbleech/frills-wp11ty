var Videos = {

  _acordions: [],

  init() {
    const ACORDIONS = C.GetBy.selector("[data-acordion]");
    for(let i=0; i<ACORDIONS.length; i++) {
      this._acordions.push(new Acordion(ACORDIONS[i]));
    }
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

  dispose() {
    this._acordions = [];
  },

  toggle: function(__btn) {
    const ACORDION  = __btn.parentNode;
    ACORDION.setAttribute("aria-expanded", ACORDION.getAttribute("aria-expanded") === "false");
  },

  resize() {
    for(let i=0; i<this._acordions.length; i++) {
      this._acordions[i].resize();
    }
  }
};



class Acordion {
  container;
  group;
  toogle;

  constructor(__container, __id) {
    this.container = __container;
    this.toogle = C.GetBy.selector("[data-acordion-toogle]", __container)[0];
    this.group = C.GetBy.selector("[data-acordion-group]", __container)[0];
    this.container.setAttribute("aria-expanded", "false");

    this.toogle.addEventListener(Basics.clickEvent, (e)=> {
        e.preventDefault();
        this.toogleState();
    });

    this.resize();
  }

  toogleState() {
    this.container.setAttribute("aria-expanded", this.container.getAttribute("aria-expanded") === "false");
  }

  resize() {
    this.container.style.setProperty("--height-close", this.toogle.offsetHeight + "px");
    this.container.style.setProperty("--height-open", this.group.offsetHeight + "px");
  }
}