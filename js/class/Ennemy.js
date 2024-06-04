import Ball from "./Ball.js";

export default class Ennemy extends Ball {
    constructor(x, y, radius, color, velX, velY) {
        super(x, y, radius);
        this.color = color;
        this.health = 1;
        this.velX = velX;
        this.velY = velY;
        this._level = 1;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    update(ctx, player) {
        let posX = Math.cos(Math.atan2((player.y - this.y),(player.x - this.x)))
        let posY = Math.sin(Math.atan2((player.y - this.y),(player.x - this.x)))
        this.x += posX * this.velX;
        this.y += posY * this.velY;
        // this.x += player.x > this.x ? this.velX : -this.velX;
        // this.y += player.y > this.y ? this.velY : -this.velY;
        this.draw(ctx);
    }
}