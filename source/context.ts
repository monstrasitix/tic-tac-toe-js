export type Contexts = {
    screen: CanvasRenderingContext2D;
    buffer: CanvasRenderingContext2D;
};

export type DrawHandler = (
    (ctx: CanvasRenderingContext2D) => void
);

const createContext = () => (
    document
        .createElement('canvas')
        .getContext('2d') as CanvasRenderingContext2D
);

export const createCanvas = (): Contexts => ({
    screen: createContext(),
    buffer: createContext(),
});

export const mount = (c: Contexts, target: HTMLElement) => {
    target.appendChild(c.screen.canvas)
}

export const draw = (c: Contexts, handler: DrawHandler) => {
    handler(c.buffer);
    c.screen.drawImage(c.buffer.canvas, 0, 0);
};

export const resize = (c: Contexts) => {
    c.screen.canvas.width = innerWidth;
    c.screen.canvas.height = innerHeight;

    c.buffer.canvas.width = innerWidth;
    c.buffer.canvas.height = innerHeight;
};