import Vector from 'vector';

export default class View {
  constructor({
    canvas = document.querySelector("canvas"),
    imageNames = [],
    cameraAnchor = new Vector(0, 0),
    cameraPosition = new Vector(0, 0),
    cameraAngle = 0,
    cameraScale = 1,
    cameraZoom = 1,
    imagesPath = "/images",
  }) {
    this.camera = {
      position: cameraPosition,
      anchor: cameraAnchor,
      angle: cameraAngle,
      scale: cameraScale,
      zoom: cameraZoom,
    };
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.handleResize();
    this.fillScreen();
    this.imagesPath = imagesPath;
    this.imageNames = imageNames;
    this.images = this.loadImages();
  }

  clearCanvas() {
    this.canvas.width = this.canvas.width;
  }

  preDraw() {
    this.clearCanvas();
    this.ctx.setTransform(
      this.camera.zoom, 0, 0, this.camera.zoom, -(this.camera.zoom - 1) * this.canvas.width * this.camera.anchor.x,
      -(this.camera.zoom - 1) * this.canvas.height * this.camera.anchor.y
    );
    this.ctx.translate(this.canvas.width * this.camera.anchor.x,this.canvas.height * this.camera.anchor.y);
    this.ctx.rotate(this.camera.angle);
    this.ctx.translate(- this.camera.position.x, - this.camera.position.y);
  }

  drawImage(img, x, y, angle = 0, scale = 1) {
    if(!img.width && !img.height) img = this.images[img];
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x + img.width * scale / 2, y + img.height * scale / 2);
    ctx.rotate(angle);
    ctx.translate(- x - img.width * scale / 2, - y - img.height * scale / 2);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    ctx.restore();
  }

  loadImages() {
    return this.imageNames.reduce((images, name) => {
      images[name] = new Image();
      images[name].src = `${this.imagesPath}/${name}.png`;
      return images;
    }, {});
  }

  fillScreen() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  handleResize() {
    window.onresize = this.fillScreen.bind(this);
  }
}
