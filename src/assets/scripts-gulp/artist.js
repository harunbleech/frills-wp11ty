var Artists = {
  init: function() {
    
  }
};

//READY?
if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
  Artists.init();
} else {
  document.addEventListener('DOMContentLoaded', Artists.init);
}
