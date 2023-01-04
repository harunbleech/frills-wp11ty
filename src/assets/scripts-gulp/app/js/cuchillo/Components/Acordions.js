var Acordions = {

  _acordions: [],

  init() {
    const ACORDIONS = C.GetBy.selector("[data-acordion]");
    for(let i=0; i<ACORDIONS.length; i++) {
      this._acordions.push(new Acordion(ACORDIONS[i]));
    }
  },

  dispose() {
    this._acordions = [];
  },

  toggle: function(__btn) {
    const ACORDION  = __btn.parentNode;
    ACORDION.setAttribute("aria-expanded", ACORDION.getAttribute("aria-expanded") === "false");

    setTimeout(()=>{
      Main.resize();
    },2000);
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