class Image3D {
  _dom;

  mesh;
  width;
  height;
  attributes = {x:0, y:0, z:0, rotation:0, scale:0, speed:0, scaleItem:1};

  _img;
  _size;
  _text;

  constructor(__dom, __opts) {
    this._dom = __dom;

    this.getSize(true);

    this.mesh = this.createMesh({
      width: this._size.width,
      height: this._size.height,
      src: __opts.src.split(",")[1],
      iWidth: Number(__opts.width),
      iHeight: Number(__opts.height),
    });

    this.attributes.x = __opts.x;
    this.attributes.y = __opts.y;
    this.attributes.z = __opts.z;

    /*this.mesh.position.x =  this.attributes.x;
    this.mesh.position.y =  this.attributes.y;*/
    this.mesh.position.z =  this.attributes.z;
    this.mesh.rotation.z =  this.attributes.rotation;
    this.mesh.visible = false;

    this.draw(this.attributes,0,0,0)

    Main.stage.scene.add(this.mesh);
  }

  createMesh(o) {
    let material = MATERIAL_IMAGE_SCALE.clone();
    let texture = new THREE.TextureLoader().load(o.src + "?time=" + new Date().getTime());
    texture.needsUpdate = true;
    // image cover
    let imageAspect = o.iHeight / o.iWidth;

    let a1;
    let a2;
    if (o.height / o.width > imageAspect) {
      a1 = (o.width / o.height) * imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = o.height / o.width / imageAspect;
    }
    texture.minFilter = THREE.LinearFilter;

    material.uniforms.resolution.value.x = o.width;
    material.uniforms.resolution.value.y = o.height;
    material.uniforms.resolution.value.z = a1;
    material.uniforms.resolution.value.w = a2;

    material.uniforms.alpha.value = 1;
    material.uniforms.velocity.value = 0;
    material.uniforms.progress.value = 1;

    material.uniforms.texture.value = texture;
    material.uniforms.texture.value.needsUpdate = true;

    let mesh = new THREE.Mesh(BASIC_PLANE, material);
    mesh.scale.set(o.width, o.height, o.width / 2);

    return mesh;
  }

  draw(__position, __progress, __velocity, __alpha) {
    this.mesh.material.uniforms.time.value++;

    const POSITION = Main.stage.domPositionTo3D(__position.x+this._size.left+this._size.width*.5,__position.y+this._size.height * .5);

    this.mesh.position.x =  POSITION.x;
    this.mesh.position.y =  POSITION.y;
    this.mesh.material.uniforms.progress.value = __progress;
    this.mesh.material.uniforms.velocity.value = __velocity;
    this.mesh.material.uniforms.alpha.value = __alpha;
  }

  getSize(__first) {
    const bounds = this._dom.getBoundingClientRect();

    this._size = {
      top: bounds.top - Scroll.y,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height
    };

    //console.log(this._size.top, this._dom.offsetTop)
  }

  resize(w,h) {
    this.getSize();
    this.mesh.scale.set(this._size.width, this._size.height, 200);
  }

  dispose() {
    super.dispose();
  }
}

