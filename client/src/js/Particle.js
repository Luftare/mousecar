import Vector from 'vector';

export default class Particle {
  constructor(position) {
    this.position = new Vector(position);
    this.decay = 1;
    this.life = 1;
    this.color = '#000';
    this.r = 20;
  }

  update(dt) {
    this.life = Math.max(0, this.life - dt / this.decay);
  }

  render(view) {
    const { ctx } = view;
    ctx.save();
    ctx.globalAlpha = this.life * 0.95;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

export class SkidMark extends Particle {
  constructor(position) {
    super(position);
    this.color = '#222';
    this.r = 4;
    this.decay = 10;
  }
}

export class Smoke extends Particle {
  constructor(position) {
    super(position);
    this.velocity = (new Vector()).random(60);
    this.color = '#EEE';
    this.maxR = 50;
    this.decay = 5;
  }

  render(view) {
    const { ctx } = view;
    const r = (1.3 - this.life) * this.maxR;
    ctx.save();
    ctx.globalAlpha = this.life * 0.95;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update(dt) {
    this.position.scaledAdd(dt, this.velocity);
    this.life = Math.max(0, this.life - dt / this.decay);
  }
}
