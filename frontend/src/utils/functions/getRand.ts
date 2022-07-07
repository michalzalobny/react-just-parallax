export const getRandInt = (minimum: number, maximum: number): number => {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

export const getRandFloat = (minimum: number, maximum: number): number => {
  return Math.random() * (maximum - minimum + 1) + minimum;
};
