class Message extends Win {

  iframe;
  _waiting;

  constructor(__container) {
    super(__container, "message");
    this.directHide();
    this.iframe = C.GetBy.class("__iframe", this.container)[0];
  }

  success(__text, __btn) {
    this.text(__text, "__success", __btn);
  }

  error(__text, __btn) {
    this.text(__text, "__error", __btn);
  }

  text(__text, __type, __btn) {
      this.show();
  }

  iframe() {
    this.show();
  }


  show__effect(__d = 0) {
    console.log(Basics.tempValue)
    this.iframe.setAttribute("src", Basics.tempValue);
    gsap.to(this.container,{alpha:1, y:0,duration:.4, ease:Power3.easeOut, onComplete:()=>{this.afterShow()}});
  }

  afterShow() {
    super.afterShow();
  }

  hide__effect(__d = 0) {
    gsap.to(this.container,{alpha:0, duration:.4, ease:Power3.easeOut, onComplete:()=>{this.afterHide();}});
  }

  afterHide() {
    this.container.classList.remove("__success");
    this.container.classList.remove("__error");

    super.afterHide();
  }

  directHide() {
    gsap.set(this.container,{alpha:0});
    super.directHide();
  }

  resize() {
    super.resize();
  }
}

var WinMessage = new Message(C.GetBy.id("Message"));

