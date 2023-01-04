class Scrollbar  {

  container = null;
  track = null;
  thumb = null;

  p0 = 0;
  p1 = 0;
  size = 0;
  sizeThumb = 0;
  offset = 0;
  axis;
  type; //progress : thumb
  onChange = null;
  progress = 0;

  _isDrag = false;
  _axis;
  _s;
  _p;



  constructor(__container = C.GetBy.id("Scrollbar")) {
    this.container = __container;
    this.track = C.GetBy.class("track", this.container)[0];
    this.thumb = C.GetBy.class("thumb", this.container)[0];

    this.axis = this.container.getAttribute("data-axis-x") == null? "Y" : "X";
    this.type = this.container.getAttribute("data-type") == null? "progress" : this.container.getAttribute("data-direction");

    if(this.axis === "Y") {
      this._axis = "y";
      this._s = "height";
      this._p = "scaleY";
    } else {
      this._axis = "x";
      this._s = "width";
      this._p = "scaleX";
    }


    this.setup();
    this.resize();
  }

  setup() {
    if(this.type === "progress") {
      this.container.addEventListener(Basics.clickEvent, (e) => {
        this.check(this.direction === "Y"? e.clientY : e.clientX);
      });

      this.container.addEventListener(Basics.downEvent, (e) => {
        //Cursor.drag = true;

        let __drag = (e) => { this.drag(e); };
        let __remove = () => {
          //Cursor.drag = false;
          this.container.removeEventListener(Basics.moveEvent, __drag);
          this.container.removeEventListener(Basics.upEvent, __remove);

          document.removeEventListener(Basics.moveEvent, __drag);
          document.removeEventListener(Basics.upEvent, __remove);
        };

        this.check(this.axis === "Y"? e.clientY : e.clientX);
        this.container.addEventListener(Basics.moveEvent, __drag);
        this.container.addEventListener(Basics.upEvent, __remove);

        document.addEventListener(Basics.moveEvent, __drag);
        document.addEventListener(Basics.upEvent, __remove);
      });

    } else {

    }
  }

  drag(e) {
    console.log(this.container);
    console.log(e.clientX);

    this.check(this.axis === "Y"? e.clientY : e.clientX);
  }

  check(__p) {
    if(this.onChange) this.onChange(Math.max(0, Math.min(1, Maths.precission(Maths.normalize(this.p1, this.p0, (__p - this.offset)),3))));
  }

  update(__progress) {
    this.progress = __progress;
    TweenLite.set(this.thumb, {[this._p]: __progress});
  }

  end() {
    this.progress = 0;
    TweenLite.set(this.thumb, {[this._p]: 0});
  }

  resize() {
    if(this.axis === "Y") {
      this.size = this.track.offsetHeight;
      this.sizeThumb = this.thumb.offsetHeight;
      this.offset = this.container.offsetTop;
    } else {
      this.size = this.track.offsetWidth;
      this.sizeThumb = this.thumb.offsetWidth;
      this.offset = this.container.offsetLeft;
    }

    this.p0 = 0;
    this.p1 = this.size;
  }

  dispose() {

  }
}