class MrScroll {
  id;
  width;
  height;
  options;

  position = 0;
  size = 0;
  p0 = 0;
  p1 = 0;
  target = 0;
  pWheel0 = 0;
  isNative = true;

  total_items = 0;
  progress = 0;
  scrollbar = null;
  hasLinkNext = false;

  _items = [];
  _container = null;
  _element = null;
  _enabled = false;
  _isShow = false;

  _axis = "y";
  _measure = "height";
  _offsetAxis = "offsetTop";
  _offsetSize = "offsetHeight";

  _call;

  //
  // GETTER & SETTER
  //

  get enabled() { return this._enabled; }
  set enabled(__bol) {

    if(this._enabled !== __bol) {
      if(!__bol) {
        if (!this._container.classList.contains("__noScroll")) {
          this._container.classList.add("__noScroll");
          Scroll.y = Scroll.y - 1;
          window.scroll(0, -Scroll.y);
        }
        this._element.removeEventListener('scroll', this._call, {passive: true});
      } else {
        this._container.classList.remove("__noScroll");

        this._element.addEventListener('scroll', this._call);
      }
    }

    this._enabled = __bol;
  }

  //
  // CONSTRUCTOR
  //

  constructor(options = {}) {
    this._container = options.container;
    this._element = options.element;
    this.id = this._container.getAttribute("id") || "";
    this.width = Metrics.WIDTH;//this._container.offsetWidth;
    this.height = Metrics.HEIGHT;//this._container.offsetHeight;

    this.options = {
      itemClass: options.itemClass || VScroll_Item,
      wheel: options.wheel === undefined? true : options.wheel,
      isMain: options.isMain || true,
    };

    this._container.classList.add("__scroll-manual");
    this._container.classList.add("__scroll-axis-y");
    this._axis = "y";
    this._measure = "height";
    this._offsetAxis = "offsetTop";
    this._offsetSize = "offsetHeight";

    this._call = () => {
      this._check();
    };
  }

  //
  // PRIVATE
  //

  _check() {
    Scroll.isScrolling = true;
    Scroll.direction =  Scroll.y > -window.pageYOffset? 1 : -1;

    this.position =
      Scroll.y = -window.pageYOffset;
  }

  _getClass(__item) {
    let idClass = __item.getAttribute("data-scroll-class") || "default";
    for (let i = 0, j = this.options.itemClass.length; i < j; i++) {
      if (idClass === this.options.itemClass[i].id || i === this.options.itemClass.length - 1) {
        return this.options.itemClass[i].class;
      }
    }
  }

  //
  // PUBLIC
  //

  start() {
    this.enabled = true;
  }

  show() {
    if(!this._isShow) {
      this.loop(true);
      this._isShow = true;
    }
  }

  addDomElement(__item) {
    let item = new this.options.itemClass(__item, this.total_items, this);
    this.total_items = this._items.push(item);

    this.resetPositions();
  }

  add(__item, __z = 0) {
    this.total_items = this._items.push(__item);
  }

  addAll(__selector = '[scroll-item]') {
    let _items = this._container.querySelectorAll(__selector);

    for (let i = 0, j = _items.length; i<j; i++) {
      let _class = Scroll._classItems.length > 0? Scroll._getClass(_items[i]) : this.options.itemClass;
      let _item = new _class(_items[i], this.total_items, this);
      this.total_items = this._items.push(_item);
    }

    this.resetPositions();
  }

  addBullet(__el) {
    this.scrollbar.addBullet(__el);
  }

  setScrollbar(__scrollbar) {
    this.scrollbar = __scrollbar;
    this.scrollbar.onChange = (__p) => {
      this.goto(Maths.lerp(this.p0, -this.p1, __p));
    };
  }

  goto(__n, __duration = 2, __ease = Power3.easeOut) {
    gsap.to(this._element,{scrollTo:__n, __duration:1, ease:__ease, onUpdate:()=>this._check()});
  }

  directGoto(__n) {
    TweenLite.set(this._element,{scrollTo:__n});
    this._check();
  }

  move(__n) {
    this.directGoto(__n);
  }

  loop(__force = false) {


    if(Scroll.isScrolling || __force) {
      for (let i = 0; i < this.total_items; i++) {
        this._items[i][this._axis] = this.position;
      }
    }

    this.progress = this.position === 0 ? 0 : this.position / this.p1;

    if (this.scrollbar) {
      this.scrollbar.update(this.progress);
    }

    Scroll.isScrolling = false;
  }

  resetPositions() {
    this.p1 = this.p0;

    for(let i=0; i<this.total_items; i++) {
      let temp = this._items[i]._item[this._offsetAxis];
      //this._items[i].setPositions(0, temp);
      this.p1 = Math.max(this.p1, temp + this._items[i][this._measure]);
    }

    this.p1 = Math.floor(this._container[this._offsetSize] - this.p1);
    this.size = -this.p1;
  }

  resize() {
    this.width = Metrics.WIDTH;//this._container.offsetWidth;
    this.height = Metrics.HEIGHT

    this.p1 = this.p0;
    for(let i=0; i<this.total_items; i++) {
      this._items[i].resize(this.width, this.height);
    }

    for(let i=0; i<this.total_items; i++) {
      this._items[i].resizeLimits(Metrics.HEIGHT/*this._container[this._offsetSize]*/);
      this.p1 = Math.max(this.p1, this._items[i]._item[this._offsetAxis] + this._items[i][this._measure]);
    }

    this.p1 = Math.floor(this.height - this.p1);
    this.position = Math.max(this.position, this.p1);
    this.size = -this.p1;

    if(this.scrollbar) this.scrollbar.resize();

    if(this._isShow) {
      this.loop(true);
    }
  }

  hide() {
    this.enabled = false;
    this._container.classList.remove("__scroll-manual");
    this._container.classList.remove("__noScroll");
    this._container.classList.remove("__scroll-axis-y");
    this._container.classList.remove("__scroll-axis-x");
    if (this.scrollbar) this.scrollbar.end();
  }

  dispose() {
    this.enabled = false;
    for (let i = 0; i < this.total_items; i++) {
      this._items[i].dispose();
    }
    this.total_items = 0;
    this._items = [];
  }
}