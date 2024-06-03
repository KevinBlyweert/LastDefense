import { ActionLimit, Ennemy, Player } from "./class/index.js";
import utils from "./utils/utils.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const game = {}, store = document.querySelector(".store"), gameInfoTabs = document.querySelector(".gameInfo"), ennemies = [];
let width = (canvas.width = (window.innerWidth >= 640 ? 640 : window.innerWidth)), height = (canvas.height = width), spawnTimer = 5000;

const app = {
    createGame: () => {
        game.player = new Player(width / 2, height / 2, 10, "#0090FF");
        game.actionLimit = new ActionLimit(game.player.x, game.player.y, width / 2 * 0.6, "#FFF");
        // app.addEnnemies();
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
    addEnnemies: () => {
        setInterval(() => {
            const ennemy = new Ennemy(20, 20, 5, "red", 0, 0);
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
        }
        ennemies.forEach(ennemy => {
            ennemy.draw(ctx);
        });
        game.player.draw(ctx);
        game.actionLimit.draw(ctx);
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