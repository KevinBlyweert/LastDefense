import Ball from "./Ball.js";

export default class ActionLimit extends Ball {
    constructor(x, y, radius, color) {
        super(x, y, radius);
        this.color = color;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}