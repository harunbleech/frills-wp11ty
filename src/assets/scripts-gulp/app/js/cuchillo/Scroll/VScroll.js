class VScroll {
  static classItems = [];

  id;
  width;
  height;
  options;

  positionSlow = 0;
  position = 0;
  size = 0;
  p0 = 0;
  p1 = 0;
  target = 0;
  pWheel0 = 0;
  isNative = false;

  total_items = 0;
  progress = 0;
  scrollbar = null;
  hasLinkNext = false;

  _items = [];
  _container = null;
  _enabled = false;
  _isWheelEnabled = false;
  _isShow = false;

  _axis = "y";
  _measure = "height";
  _offsetAxis = "offsetTop";
  _offsetSize = "offsetHeight";

  _call;

  //
  // GETTER & SETTER
  //

  get enabledWheel() { return this._enabled; };
  set enabledWheel(__isEnabled) {

    if(this._isWheelEnabled !== __isEnabled) {
      this._isWheelEnabled = __isEnabled;

      if(this._isWheelEnabled) {
        this.scroller.on(this._call);
      } else {
        this.scroller.off(this._call);
      }
    }
  };

  get enabled() { return this._enabled; };
  set enabled(__isEnabled) {
    if(this._enabled !== __isEnabled) {
      this._enabled = __isEnabled;

      if (__isEnabled) {
        this._initKeyboard();
      } else {
        this._endKeyboard();
      }

      this.enabledWheel = __isEnabled && this.options.wheel;
    }
  };

  //
  // CONSTRUCTOR
  //

  constructor(options = {}) {
    this._container = options.container;
    this.id = Functions.getId(this._container);
    this.width = this._container.offsetWidth;
    this.height = this._container.offsetHeight;

    this.scroller = new virtualScroll({
      mouseMultiplier: navigator.platform.indexOf('Win') > -1 ? 1 : 0.4,
      firefoxMultiplier: 50,
      touchMultiplier: 3,
      passive: true
    });

    this.options = {
      axis: options.axis || Scroll.AXIS_Y,
      easing: options.easing || 0.08,
      maxSpeed: options.maxSpeed || 400,
      gap: options.gap || 1,
      multiplicator: options.multiplicator || 1,
      itemClass: options.itemClass || VScroll_Item,
      wheel: options.wheel === undefined? true : options.wheel,
      isMain: options.isMain || true,
      hasSlowly: options.hasSlowly || false,
    };

    this._call = (e) => {
    //   console.log(e);
      this._check(e);
    };

    this._container.classList.add("__vscroll");

    switch(this.options.axis) {
      case Scroll.AXIS_Y:
        this._container.classList.add("__scroll-axis-y");
        this._axis = "y";
        this._measure = "height";
        this._offsetAxis = "offsetTop";
        this._offsetSize = "offsetHeight";

        break;
      case Scroll.AXIS_X:
        this._container.classList.add("__scroll-axis-x");
        this._axis = "x";
        this._measure = "width";
        this._offsetAxis = "offsetLeft";
        this._offsetSize = "offsetWidth";

        break;
    }
  }

  _initKeyboard() {
    Keyboard.add(Keyboard.HOME, this.id, () => {
      this.gotoHome();
    });
    Keyboard.add(Keyboard.END, this.id, () => {
      this.gotoEnd();
    });
    Keyboard.add(Keyboard.REPAG, this.id, () => {
      this.gotoRePag();
    });
    Keyboard.add(Keyboard.AVPAG, this.id, () => {
      this.gotoAvPag();
    });
  }

  _endKeyboard() {
    Keyboard.remove(Keyboard.HOME, this.id);
    Keyboard.remove(Keyboard.END, this.id);
    Keyboard.remove(Keyboard.REPAG, this.id);
    Keyboard.remove(Keyboard.AVPAG, this.id);
  }

  //
  // PRIVATE
  //

  _check(e) {
    let d = e.deltaY * this.options.multiplicator;

    Scroll.isScrolling = true;
    Scroll.direction = e.deltaY < 0? 1 : -1;

    this._setTarget(Maths.precission(this.target + d, 2));
  }

  _setTarget(__n) {
    this.target = Math.min(this.p0, Math.max(__n, this.p1));
  }

  /*_getClass(__item) {
    let idClass = __item.getAttribute("data-scroll-class") || "default";
    for (let i = 0, j = this.options.itemClass.length; i < j; i++) {
      if (idClass === this.options.itemClass[i].id || i === this.options.itemClass.length - 1) {
        return this.options.itemClass[i].class;
      }
    }
  }*/

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

  addDomElement(__item, __z = 0) {
    let item = new this.options.itemClass(__item, this.total_items, this);
    item.z = __z;
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

  /*

  GOTOs

   */

  gotoAvPag(__isDirect) {
    this._goto((-this.target) + this[this._measure], __isDirect);
  }

  gotoRePag(__isDirect) {
    this._goto((-this.target) - this[this._measure], __isDirect);
  }

  gotoHome(__isDirect) {
    this._goto(0, __isDirect);
  }

  gotoEnd(__isDirect) {
    this._goto(-this.p1, __isDirect);
  }

  _goto(__n, __isDirect) {
    if(__isDirect) {
      this.directGoto(__n);
    } else {
      this.goto(__n);
    }
  }

  goto_percetage(__percentage, __isDirect) {
    this._goto(Maths.lerp(this.p0,-this.p1,__percentage, __isDirect));
  }

  goto(__n) {
    Scroll.isScrolling = true;
    this._setTarget(-__n);
  }

  directGoto(__n) {
    Scroll.isScrolling = true;

    this._setTarget(-__n);
    this.position = this.target;

    this.loop(true);
  }

  move(__n) {
    this.target = Math.min(this.p0, Math.max(Maths.precission(this.target + __n, 2), this.p1));this._setTarget(Maths.precission(this.target + __n, 2));
  }

  /*

  LOOP

   */

  loop(__force = false) {

    let TARGET_CHECK_POSITION = this.position;

    if(this.options.hasSlowly) {
      TARGET_CHECK_POSITION = this.positionSlow;
    }



    if(this.target !== TARGET_CHECK_POSITION || __force) {

      this.speed = Maths.precission(((this.target - this.position) * this.options.easing), 2);

      if(this.speed === 0) this.position = this.target;

      if (this.speed > 0) {
        this.speed = Math.min(this.speed, (-this.position) / 10);
        this.position = Maths.precission(this.position + this.speed, 2);
      } else if (this.speed < 0) { //SCROLL DOWN
        this.speed = Math.max(this.speed, (this.p1 - this.position) / 10);
        this.position = Maths.precission(this.position + this.speed, 2);
      }

      this.positionSlow += (this.position - this.positionSlow) * .4;
      this.positionSlow = Maths.precission(this.positionSlow, 2);

      Scroll[this._axis] = this.position;
      Scroll.slowPosition = this.positionSlow;

      for (let i = 0; i < this.total_items; i++) {
        this._items[i][this._axis] = this.position;
      }

      this.progress = this.position === 0 ? 0 : this.position / this.p1;

      if (this.scrollbar) {
        this.scrollbar.update(this.progress);
      }

      if(this.options.wheel && this.options.isMain) {
        Basics.velocidad = this.speed;
        Scroll.speed = this.speed;
      }
    } else if(this.target === this.p1 && this.hasLinkNext) {
      this._items[this.total_items - 1][this._axis] = this.position;
    } else {
      if(this.options.wheel) {
        Scroll.isScrolling = false;
      }
    }
  }

  /*

  RESIZES

   */

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
    this.width = this._container.offsetWidth;
    this.height = this._container.offsetHeight;

    this.p1 = this.p0;
    for(let i=0; i<this.total_items; i++) {
      this._items[i].resize(this.width, this.height);
    }

    for(let i=0; i<this.total_items; i++) {
      this._items[i].resizeLimits(this._container[this._offsetSize]);
      this.p1 = Math.max(this.p1, this._items[i]._item[this._offsetAxis] + this._items[i][this._measure]);
    }

    this.p1 = Math.floor(this._container[this._offsetSize] - this.p1);
    this.position = Math.max(this.position, this.p1);
    this.size = -this.p1;

    if(this.scrollbar) this.scrollbar.resize();

    if(this._isShow) {
      this.loop(true);
    }
  }

  /*

  HIDE

   */

  hide() {
    this.enabled = false;
    this._container.classList.remove("__vscroll");
    this._container.classList.remove("__scroll-axis-y");
    this._container.classList.remove("__scroll-axis-x");
    if (this.scrollbar) this.scrollbar.end();
  }

  /*

  DISPOSE

   */

  dispose() {
    this.enabled = false;
    for (let i = 0; i < this.total_items; i++) {
      this._items[i].dispose();
    }
    this.total_items = 0;
    this.scroller.destroy();
    this._items = [];
  }
}
