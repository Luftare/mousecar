import Vector from 'vector';

export default class Input {
  constructor() {
    this.mouse = {
      position: new Vector(200, 200),
      down: false,
    };

    window.addEventListener('mousemove', e => {
      this.mouse.position.set(e.x, e.y);
    });

    window.addEventListener('mousedown', e => {
      this.mouse.down = true;
    });

    window.addEventListener('mouseup', e => {
      this.mouse.down = false;
    });
  }
}
