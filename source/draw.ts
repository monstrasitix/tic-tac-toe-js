import * as Config from "./config";

export const drawBackground = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas;

    ctx.fillStyle = Config.BACKGROUND_COLOR;
    ctx.fillRect(0, 0, width, height);
}

export const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const cellSize = Config.CELL_SIZE;
    const cellCount = Config.CELL_COUNT;

    // Half of grid size
    const hGridSize = cellCount * cellSize / 2;

    // (x, y) for grid's top left corner
    const pivotX = ctx.canvas.width / 2 - hGridSize;
    const pivotY = ctx.canvas.height / 2 - hGridSize;

    ctx.strokeStyle = Config.LINE_COLOR;

    for (let index = 1; index < cellCount; index++) {
        // Constant positions
        const y = pivotY + cellSize * index;
        const x = pivotX + cellSize * index;

        // Horizontal
        ctx.beginPath();
        ctx.moveTo(pivotX, y);
        ctx.lineTo(pivotX + cellSize * cellCount, y);
        ctx.stroke();

        // Vertical
        ctx.beginPath();
        ctx.moveTo(x, pivotY);
        ctx.lineTo(x, pivotY + cellSize * cellCount);
        ctx.stroke();
    }
}

export const drawLine = (ctx: CanvasRenderingContext2D) => {
    const cellSize = Config.CELL_SIZE;
    const cellCount = Config.CELL_COUNT;

    // Half of grid size
    const hGridSize = cellCount * cellSize / 2;

    // (x, y) for grid's top left corner
    const pivotX = ctx.canvas.width / 2 - hGridSize;
    const pivotY = ctx.canvas.height / 2 - hGridSize;

    {
        // Continue drawing lines
        // Horizontal
        const y = pivotY + (cellSize / 2) * 1;
    
        ctx.strokeStyle = Config.LINE_COLOR;
        
        ctx.beginPath();
        ctx.moveTo(pivotX, y);
        ctx.lineTo(pivotX + cellSize * cellCount, y);
        ctx.stroke();
    }
} 

const clamp = (max: number, min: number, value: number) => (
    Math.min(Math.max(value, min), max)
);

const fixCoordinates = (x: number, y: number) => {
    const clampCount = Config.CELL_COUNT - 1;

    return [
        clamp(clampCount, 0, x) + 1,
        clamp(clampCount, 0, y) + 1,
    ];
};

const calcPosition = (
    width: number,
    height: number,
    xIndex: number,
    yIndex: number,
) => {
    const [posX, posY] = fixCoordinates(xIndex, yIndex);

    const hCellSize = Config.CELL_SIZE / 2;
    const hGridSize = Config.CELL_COUNT * hCellSize;

    return [
        width / 2 - hGridSize + (posX * Config.CELL_SIZE - hCellSize),
        height / 2 - hGridSize + (posY * Config.CELL_SIZE - hCellSize),
    ];
};

export const drawO = (pointX: number, pointY: number) => (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = Config.O_COLOR;

    const [x, y] = calcPosition(
        ctx.canvas.width,
        ctx.canvas.height,
        pointX,
        pointY,
    );

    ctx.beginPath();
    ctx.arc(x, y, Config.SYMBOL_SIZE, 0, Math.PI * 2, false);
    ctx.stroke();
}

export const drawX = (pointX: number, pointY: number) => (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = Config.X_COLOR;

    const [x, y] = calcPosition(
        ctx.canvas.width,
        ctx.canvas.height,
        pointX,
        pointY,
    );

    ctx.beginPath();
    ctx.moveTo(x - Config.SYMBOL_SIZE, y - Config.SYMBOL_SIZE);
    ctx.lineTo(x + Config.SYMBOL_SIZE, y + Config.SYMBOL_SIZE);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + Config.SYMBOL_SIZE, y - Config.SYMBOL_SIZE);
    ctx.lineTo(x - Config.SYMBOL_SIZE, y + Config.SYMBOL_SIZE);
    ctx.stroke();
}
