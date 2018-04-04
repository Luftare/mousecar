import Vector from 'vector';

export default class Car {
  constructor() {
    this.engineForce = 1;
    this.breakForce = 2;
    this.wheelMaxAngle = Math.PI / 4;
    this.width = 50;
    this.height = 150;
    this.position = new Vector();
    this.velocity = new Vector();
    this.direction = new Vector(1, 0);
  }
}
