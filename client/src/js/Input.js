import Vector from 'vector';

export default class Input {
  constructor() {
    this.mouse = {
      position: new Vector(200, 200)
    }

    window.addEventListener('mousemove', e => {
      this.mouse.position.set(e.x, e.y);
    });
  }
}
