class Wall {
  constructor(x, y, width, height) {
    var opt = {
      isStatic: true,
    };
    this.wall = Bodies.rectangle(x, y, width, height, opt);
    this.width = width;
    this.height = height;
    World.add(world, this.wall);
  }

  show() {
    var pos = this.wall.position;
    noStroke();
    rect(pos.x, pos.y, this.width, this.height);
  }
}
