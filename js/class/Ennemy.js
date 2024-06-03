import Ball from "./Ball.js";

export default class Ennemy extends Ball {
    constructor(x, y, radius, color, velX, velY) {
        super(x, y, radius);
        this.color = color;
        this.health = 1;
        this.velX = velX;
        this.velY = velY;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    update(ctx) {

    }
}