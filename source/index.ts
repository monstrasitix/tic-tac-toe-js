import { drawBackground, drawGrid, drawLine, drawO, drawX } from './draw';
import { createCanvas, draw, mount, resize } from './context';

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

    draw(ctx, drawX(0, 0));
    draw(ctx, drawX(1, 1));
    draw(ctx, drawX(2, 2));
    draw(ctx, drawLine);
});