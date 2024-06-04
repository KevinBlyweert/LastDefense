import Ball from "./Ball.js";

export default class Player extends Ball {
    constructor(x, y, radius, color) {
        super(x, y, radius);
        this.color = color;
        this._level = 1;
        this.cost = 2;
        this.gameInfo = {
            health: 50,
            damages: 5,
            defense: 4,
            fireSpeed: 1,
            money: 5,
            ennemiesOut: 0,
        }
        this.lastShot = undefined;
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