import Car from './Car';
import Input from './Input';
import Loop from 'loop';
import View from './View';
import { Smoke, SkidMark } from './Particle';

export default class Game {
  constructor() {
    this.state = this.getInitState();
    this.view = new View({
      canvas: document.getElementById('game-canvas'),
      imageNames: ['car'],
      imagesPath: '/src/images'
    });

    this.input = new Input();

    this.loop = new Loop({
      onTick: (dtMs) => {
        const dt = dtMs / 1000;
        this.update(dt);
        this.render();
      },
      animationFrame: true
    });

    this.particles = [];
  }

  update(dt) {
    this.state.gameObjects.forEach(gameObject => gameObject.update(dt, this));
    this.particles = this.particles.filter(particle => particle.life > 0);
    this.particles.forEach(particle => particle.update(dt));
  }

  render() {
    const cutOff = 0.9;
    this.view.preDraw();
    const skidmarks = this.particles.filter(particle => particle instanceof SkidMark);
    const smokes = this.particles.filter(particle => particle instanceof Smoke);

    skidmarks.forEach(particle => particle.render(this.view));
    smokes.filter(particle => particle.life > cutOff).forEach(particle => particle.render(this.view));
    this.state.gameObjects.forEach(gameObject => gameObject.render(this.view));
    smokes.filter(particle => particle.life < cutOff).forEach(particle => particle.render(this.view));
  }

  getInitState() {
    return {
      gameObjects: [new Car(200, 200)]
    }
  }

  start() {
    this.loop.start();
  }
}
