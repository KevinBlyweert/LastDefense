export function roundNumberUp(number, decimals) {
    if (typeof number != "number" || typeof decimals != "number") return false;
    let pow = '1';
    for (let index = 0; index < decimals; index++) {
        pow += '0';
    }
    number = Math.round(number * parseInt(pow)) / parseInt(pow);
    return number;
}

export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}