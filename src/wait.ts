export function wait(delay: number = 0): Promise<number> {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
