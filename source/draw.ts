import * as Config from './config';

export const drawBackground = (ctx: CanvasRenderingContext2D) => {
	const { width, height } = ctx.canvas;

	ctx.fillStyle = Config.BACKGROUND_COLOR;

	ctx.fillRect(0, 0, width, height);
};

export const drawGrid = (ctx: CanvasRenderingContext2D) => {
	const cellSize = Config.CELL_SIZE;
	const cellCount = Config.CELL_COUNT;

	// Half of grid size
	const hGridSize = cellCount * cellSize / 2;

	// (x, y) for grid's top left corner
	const pivotX = ctx.canvas.width / 2 - hGridSize;
	const pivotY = ctx.canvas.height / 2 - hGridSize;

	ctx.lineCap = 'round';
	ctx.lineWidth = Config.LINE_WIDTH;
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
};

type Direction = 'horizontal' | 'vertical' | 'diagonal';


export const drawLine = (
	ctx: CanvasRenderingContext2D,
	direction: Direction = 'horizontal',
) => {
	ctx.lineCap = 'round';
	ctx.lineWidth = Config.LINE_WIDTH;
	ctx.strokeStyle = (
		Config.X_COLOR
		||
		Config.O_COLOR
	);

	ctx.canvas.width / 2;

	const hGridSize = Config.CELL_COUNT * Config.CELL_SIZE / 2;

	// (x, y) for grid's top left corner
	const pivotX = ctx.canvas.width / 2 - hGridSize;
	const pivotY = ctx.canvas.height / 2 - hGridSize;

	ctx.beginPath();

	const y = pivotY + Config.CELL_SIZE / 2;
	const x = pivotX + Config.CELL_SIZE / 2;

	// TODO: Figure out this bug
	const row = 1;
	const yGap = Config.CELL_SIZE * clamp(
		Config.CELL_COUNT - 1, 0, row
	);

	switch (direction) {
		case 'horizontal':
			ctx.moveTo(pivotX, y + yGap);
			ctx.lineTo(pivotX + Config.CELL_COUNT * Config.CELL_SIZE, y + yGap);
			break;
		case 'vertical':
			ctx.moveTo(x + yGap, pivotY);
			ctx.lineTo(x + yGap, pivotY + Config.CELL_COUNT * Config.CELL_SIZE);
			break;
		case 'diagonal':
			ctx.moveTo(x + yGap, pivotY);
			ctx.lineTo(x + yGap, pivotY + Config.CELL_COUNT * Config.CELL_SIZE);
			break;
	}

	ctx.stroke();
};

const clamp = (max: number, min: number, value: number) => (
	Math.min(Math.max(min, value), max)
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

export const drawO = (ctx: CanvasRenderingContext2D, pointX: number, pointY: number) => {
	ctx.lineCap = 'round';
	ctx.lineWidth = Config.LINE_WIDTH;
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
};

export const drawX = (ctx: CanvasRenderingContext2D, pointX: number, pointY: number) => {
	ctx.lineCap = 'round';
	ctx.lineWidth = Config.LINE_WIDTH;
	ctx.strokeStyle = Config.X_COLOR;

	const [x, y] = calcPosition(
		ctx.canvas.width,
		ctx.canvas.height,
		pointX,
		pointY,
	);

	ctx.lineWidth = Config.LINE_WIDTH;

	ctx.beginPath();
	ctx.moveTo(x - Config.SYMBOL_SIZE, y - Config.SYMBOL_SIZE);
	ctx.lineTo(x + Config.SYMBOL_SIZE, y + Config.SYMBOL_SIZE);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(x + Config.SYMBOL_SIZE, y - Config.SYMBOL_SIZE);
	ctx.lineTo(x - Config.SYMBOL_SIZE, y + Config.SYMBOL_SIZE);
	ctx.stroke();
};
