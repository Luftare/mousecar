import Car from './Car';
import Input from './Input';
import Loop from 'loop';
import View from './View';

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
  }

  update(dt) {
    this.state.gameObjects.forEach(gameObject => gameObject.update(dt, this.input));
  }

  render() {
    this.view.preDraw();
    this.state.gameObjects.forEach(gameObject => gameObject.render(this.view));
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
