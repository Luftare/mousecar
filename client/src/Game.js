import Car from './Car';
import View from './View';
import Loop from 'loop';

export default class Game {
  constructor() {
    this.state = this.getInitState();
    this.view = new View({
      canvas: document.getElementById('game-canvas')
    });

    this.loop = new Loop({
      onTick: (dt) => {
        this.update(dt);
        this.render();
      },
      animationFrame: true
    });
  }

  update(dt) {
    this.state.gameObjects.forEach(gameObject => gameObject.update(dt));
  }

  render(ctx) {
    this.state.gameObjects.forEach(gameObject => gameObject.render(ctx));
  }

  getInitState() {
    return {
      gameObjects: [new Car()]
    }
  }

  start() {
    this.loop.start();
  }
}
