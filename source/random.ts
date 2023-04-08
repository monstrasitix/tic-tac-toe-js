export const randInteger = (max: number, min: number = 0) => (
    Math.floor(Math.random() * (max - min)) + min
);

export const randBool = () => (
	Math.random() >= 0.5
);
