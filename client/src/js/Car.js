import Vector from 'vector';

export default class Car {
  constructor() {
    this.engineForce = 1;
    this.breakForce = 2;
    this.wheelMaxAngle = Math.PI / 4;
    this.width = 50;
    this.height = 150;
    this.position = new Vector(100, 100);
    this.velocity = new Vector();
    this.direction = new Vector(1, 0);
  }

  update(dt, input) {
    const toMouse = (new Vector(input.mouse.position)).substract(this.position);
    this.direction.lerpAlign(dt, toMouse);
    this.velocity.set(this.direction).scale(100);
    this.position.scaledAdd(dt, this.velocity);
  }

  render(view) {
    view.drawImage('car', this.position.x, this.position.y, this.direction.angle - Math.PI, 0.1);
  }
}
