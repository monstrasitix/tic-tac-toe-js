import { drawBackground, drawGrid, drawO, drawX } from './draw';
import { createCanvas, draw, mount, resize } from './context';
import { CELL_COUNT } from './config';
import { randInteger, randBool } from './random';

const symbols: Array<{ type: 'X' | 'O', x: number, y: number }> = [];

const ctx = createCanvas();
mount(ctx, document.body);
resize(ctx);

const initialRender = (buffer: CanvasRenderingContext2D) => {
    drawBackground(buffer);
    drawGrid(buffer);

    for (const symbol of symbols) {
		if (symbol.type === 'O') {
			drawO(buffer, symbol.x, symbol.y);
		} else {
			drawX(buffer, symbol.x, symbol.y);
		}
    }
};

window.addEventListener('resize', () => {
    resize(ctx);
    draw(ctx, initialRender);
});

document.addEventListener('DOMContentLoaded', () => {
    const cords: [number, number][] = [];

    const constrain = CELL_COUNT * Math.floor(CELL_COUNT * 0.7);

    for (let index = 0; index < constrain; index++) {
        let x = randInteger(CELL_COUNT);
        let y = randInteger(CELL_COUNT);

        while (cords.some(a => a[0] === x && a[1] === y)) {
            x = randInteger(CELL_COUNT);
            y = randInteger(CELL_COUNT);
        }

        cords.push([x, y]);

        symbols.push({
            type: randBool() ? 'X' : 'O',
            x,
            y,
        });
    }

    draw(ctx, initialRender);
});
