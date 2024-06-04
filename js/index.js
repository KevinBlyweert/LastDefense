import { ActionLimit, Ennemy, Player, Bullet } from "./class/index.js";
import { roundNumberUp, random } from "./utils/utils.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const game = {}, store = document.querySelector(".store"), gameInfoTabs = document.querySelector(".gameInfo");
let width = (canvas.width = (window.innerWidth >= 640 ? 640 : window.innerWidth)), height = (canvas.height = width), spawnTimer = 1500, ennemies = [], bullets = [];

const app = {
    createGame: () => {
        game.player = new Player(width / 2, height / 2, 10, "#0090FF");
        game.actionLimit = new ActionLimit(game.player.x, game.player.y, width / 2 * 0.6, "#FFF");
        app.addEnnemies();

        app.playGame();
    },
    showGameInfo: () => {
        for (const iterator in game.player.gameInfo) {
            gameInfoTabs.querySelector(`.${iterator}_info`).textContent = game.player.gameInfo[iterator];
        }
    },
    buyUpgrade: (upgrade) => {
        if (game.player.gameInfo.money - game.player.cost >= 0) {
            game.player.gameInfo.money -= game.player.cost;
            switch (upgrade) {
                case "addHealth":
                    game.player.gameInfo.health += 1
                    break;
                case "addFire":
                    game.player.gameInfo.damages += 1
                    break;
                case "addDef":
                    game.player.gameInfo.defense += 1
                    break;
                case "addFireSpeed":
                    game.player.gameInfo.fireSpeed += 1
                    break;
                default:
                    break;
            }
        }
    },
    getRandomPosition: () => {
        let posX = 0, posY = 0, randomNum = random(1, 4);
        //randomNum gets a random between 1 and 4, one for each side (1 left, 2 top, 3 right and 4 bottom)
        switch (randomNum) {
            case 1:
                posX = 0, posY = random(0, height);
                break;
            case 2:
                posX = random(0, width), posY = 0;
                break;
            case 3:
                posX = width, posY = random(0, height);
                break;
            case 4:
                posX = height, posY = random(0, width);
                break;
            default:
                posX = 0, posY = 0;
                break;
        }
        return { posX, posY };
    },
    addEnnemies: () => {
        setInterval(() => {
            let { posX, posY } = app.getRandomPosition()
            const ennemy = new Ennemy(posX, posY, 5, "red", 1, 1);
            ennemies.push(ennemy);
        }, spawnTimer);
    },
    playGame: () => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
        if (game.player.gameInfo.money < game.player.cost) {
            store.querySelectorAll("button").forEach(btn => {
                btn.classList.add("disabled");
            });
        } else {
            store.querySelectorAll("button").forEach(btn => {
                btn.classList.remove("disabled");
            });
        }
        game.player.draw(ctx);
        game.actionLimit.draw(ctx);
        ennemies.forEach(ennemy => {
            ennemy.update(ctx, game.player);
            if (Math.pow(ennemy.x - game.actionLimit.x, 2) + Math.pow(ennemy.y - game.actionLimit.y, 2) <= Math.pow(game.actionLimit.radius, 2)) {
                if (!game.player.lastShot || Date.now() - game.player.lastShot >= game.player.gameInfo.fireSpeed * 1e3) {
                    const bullet = new Bullet(game.player.x, game.player.y, 2, "white", 3, 3, game.player.gameInfo.damages);
                    bullets.push(bullet);
                    game.player.lastShot = Date.now();
                }
            }
        });
        bullets.forEach(bullet => {
            if (ennemies.length != 0) {
                const ennemy = ennemies[0];
                bullet.update(ctx, ennemy);
                if (Math.pow(ennemy.x - bullet.x, 2) + Math.pow(ennemy.y - bullet.y, 2) <= Math.pow(bullet.radius, 2)) {
                    ennemy.health -= bullet.damages;
                    if (ennemy.health <= 0) {
                        ennemies = ennemies.filter(item => item != ennemy);
                        bullets = bullets.filter(item => item != bullet);
                        game.player.gameInfo.money += 1;
                        game.player.gameInfo.ennemiesOut += 1;
                    }
                }
            }
        })
        app.showGameInfo(game.player.gameInfo);
        requestAnimationFrame(app.playGame);
    },
    addListeners: () => {
        window.addEventListener("resize", () => {
            width = (canvas.width = (window.innerWidth >= 640 ? 640 : window.innerWidth)), height = canvas.height = width;
            game.player.x = width / 2;
            game.player.y = height / 2;
            game.actionLimit.x = width / 2;
            game.actionLimit.y = height / 2;
            game.actionLimit.radius = width / 2 * 0.6;
        })
        store.querySelectorAll("button").forEach(btn => {
            btn.classList.remove("blink");
            btn.addEventListener("click", (e) => {
                e.target.preventDefault;
                store.querySelectorAll("button").forEach(btn => {
                    btn.classList.remove("blink");
                });
                if (!e.target.classList.value.includes("disabled")) {
                    e.target.classList.add("blink");
                    app.buyUpgrade(e.target.classList[0]);
                }
                setTimeout(() => e.target.classList.remove("blink"), 500);
            })
        });
    },
    init: () => {
        app.addListeners();
        app.createGame();
    }
}

document.addEventListener("DOMContentLoaded", app.init);