import Ball from "./Ball.js";

export default class Bullet extends Ball {
    constructor(x, y, radius, color, velX, velY, damages) {
        super(x, y, radius);
        this.color = color;
        this.velX = velX;
        this.velY = velY;
        this.damages = damages;
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