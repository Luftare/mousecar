import Car from './Car';

export default class Game {
  constructor() {
    this.state = this.getInitState();

    this.loop = () => {
      this.update();
      this.render();
      requestAnimationFrame(this.loop);
    }
  }

  update(dt) {
    console.log('Updating game...');
  }

  render(ctx) {

  }

  getInitState() {
    return {
      gameObjects: [new Car()]
    }
  }

  start() {
    this.loop();
  }
}
