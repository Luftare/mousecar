import Vector from 'vector';
import { Smoke, SkidMark } from './Particle';

export default class Car {
  constructor(x, y) {
    this.mass = 1;
    this.friction = 1000;
    this.engineForce = 300;
    this.engineMaxForce = 800;
    this.turnVelocity = 4;
    this.wheelMaxAngle = Math.PI / 4;
    this.maxSpeed = 700;
    this.position = new Vector(x, y);
    this.velocity = new Vector();
    this.direction = new Vector(1, 0);
  }

  update(dt, game) {
    this.emitParticles(game);
    const toMouse = (new Vector(game.input.mouse.position)).substract(this.position);
    const mouseAngle = Math.abs(this.direction.clone().normalize().cross(toMouse.clone().normalize()));
    this.direction.lerpAlign(mouseAngle * this.turnVelocity * dt, toMouse);

    const gasForce = this.direction.clone().toLength(this.engineForce * (toMouse.length - 100) * 0.01).limit(this.engineMaxForce);
    const driftAngle = this.direction.clone().normalize().cross(this.velocity.clone().normalize());
    const driftForce = this.direction.clone().normalize().rotate(Math.PI / 2).scale(-driftAngle * this.friction);
    const force = gasForce.add(driftForce);
    const acceleration = force.scale(1 / this.mass);//f = ma => a = f / m

    this.velocity.scaledAdd(dt, acceleration).limit(this.maxSpeed);
    this.position.scaledAdd(dt, this.velocity);
  }

  getWheelPositions() {
    const wheelsFromCenter = 28;
    const left = this.direction.clone().rotate(0.35).scale(-wheelsFromCenter).add(this.position);
    const right = this.direction.clone().rotate(-0.35).scale(-wheelsFromCenter).add(this.position);
    return {
      left,
      right
    };
  }

  emitParticles(game) {
    const wheels = this.getWheelPositions();
    const relativeSpeed = this.velocity.length / this.maxSpeed;
    const weightedRelativeSpeed = Math.pow(relativeSpeed, 2);
    if(0.5 > weightedRelativeSpeed) {
      game.particles.push(
        new SkidMark(wheels.left),
        new SkidMark(wheels.right)
      );
    }
    if(Math.random() > weightedRelativeSpeed) {
      game.particles.push(
        new Smoke(wheels.left),
        new Smoke(wheels.right),
      );
    }
  }

  render(view) {
    // view.camera.position.set(this.position);
    // view.camera.angle = -this.direction.angle - Math.PI / 2;
    view.drawImage('car', this.position.x, this.position.y, this.direction.angle - Math.PI, 0.1);
  }
}
