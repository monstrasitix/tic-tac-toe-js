import { drawBackground, drawGrid, drawLine, drawO, drawX } from './draw';
import { createCanvas, draw, mount, resize } from './context';
import { CELL_COUNT } from './config';

const ctx = createCanvas();
mount(ctx, document.body);
resize(ctx);

window.addEventListener('resize', () => {
    resize(ctx);
    draw(ctx, drawBackground);
    draw(ctx, drawGrid);
});

document.addEventListener('DOMContentLoaded', () => {
    draw(ctx, drawBackground);
    draw(ctx, drawGrid);

    const rand = (max: number, min: number = 0) => (
        Math.floor(Math.random() * (max - min)) + min
    );

    const cords: [number, number][] = [];

    const randBool = () => Math.random() >= 0.5;

    const constrain = CELL_COUNT * Math.floor(CELL_COUNT * 0.7);

    for (let index = 0; index < constrain; index++) {
        let x = rand(CELL_COUNT);
        let y = rand(CELL_COUNT);

        while (cords.some(a => a[0] === x && a[1] === y)) {
            x = rand(CELL_COUNT);
            y = rand(CELL_COUNT);
        }

        cords.push([x, y]);

        if (randBool()) {
            draw(ctx, drawX(x, y));        
        } else {
            draw(ctx, drawO(x, y));
        }
    }
});