import * as Config from "./config";

export function drawBackground(this: CanvasRenderingContext2D) {
    const { width, height } = this.canvas;

    this.fillStyle = Config.BACKGROUND_COLOR;
    this.fillRect(0, 0, width, height);
}

export function drawGrid(this: CanvasRenderingContext2D) {
    const cellSize = Config.CELL_SIZE;
    const cellCount = Config.CELL_COUNT;

    // Half of grid size
    const hGridSize = cellCount * cellSize / 2;

    // (x, y) for grid's top left corner
    const pivotX = this.canvas.width / 2 - hGridSize;
    const pivotY = this.canvas.height / 2 - hGridSize;

    this.lineCap = 'round';
    this.lineWidth = Config.LINE_WIDTH;
    this.strokeStyle = Config.LINE_COLOR;

    for (let index = 1; index < cellCount; index++) {
        // Constant positions
        const y = pivotY + cellSize * index;
        const x = pivotX + cellSize * index;

        // Horizontal
        this.beginPath();
        this.moveTo(pivotX, y);
        this.lineTo(pivotX + cellSize * cellCount, y);
        this.stroke();

        // Vertical
        this.beginPath();
        this.moveTo(x, pivotY);
        this.lineTo(x, pivotY + cellSize * cellCount);
        this.stroke();
    }
}

export function drawLine(this: CanvasRenderingContext2D) {
    const cellSize = Config.CELL_SIZE;
    const cellCount = Config.CELL_COUNT;

    // Half of grid size
    const hGridSize = cellCount * cellSize / 2;

    // (x, y) for grid's top left corner
    const pivotX = this.canvas.width / 2 - hGridSize;
    const pivotY = this.canvas.height / 2 - hGridSize;

    {
        // Continue drawing lines
        // Horizontal
        const y = pivotY + (cellSize / 2) * 1;
    
        this.lineCap = 'round';
        this.lineWidth = Config.LINE_WIDTH;
        this.strokeStyle = Config.LINE_COLOR;
        
        this.beginPath();
        this.moveTo(pivotX, y);
        this.lineTo(pivotX + cellSize * cellCount, y);
        this.stroke();
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

export const drawO = (pointX: number, pointY: number) =>  function (this: CanvasRenderingContext2D) {
    this.lineCap = 'round';
    this.lineWidth = Config.LINE_WIDTH;
    this.strokeStyle = Config.O_COLOR;

    const [x, y] = calcPosition(
        this.canvas.width,
        this.canvas.height,
        pointX,
        pointY,
    );

    this.beginPath();
    this.arc(x, y, Config.SYMBOL_SIZE, 0, Math.PI * 2, false);
    this.stroke();
}

export const drawX = (pointX: number, pointY: number) =>  function (this: CanvasRenderingContext2D) {
    this.lineCap = 'round';
    this.lineWidth = Config.LINE_WIDTH;
    this.strokeStyle = Config.X_COLOR;

    const [x, y] = calcPosition(
        this.canvas.width,
        this.canvas.height,
        pointX,
        pointY,
    );

    this.beginPath();
    this.moveTo(x - Config.SYMBOL_SIZE, y - Config.SYMBOL_SIZE);
    this.lineTo(x + Config.SYMBOL_SIZE, y + Config.SYMBOL_SIZE);
    this.stroke();

    this.beginPath();
    this.moveTo(x + Config.SYMBOL_SIZE, y - Config.SYMBOL_SIZE);
    this.lineTo(x - Config.SYMBOL_SIZE, y + Config.SYMBOL_SIZE);
    this.stroke();
}
