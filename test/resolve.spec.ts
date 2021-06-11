import { resolve } from '../src';

describe('await resolve()', () => {
  async function returns() {
    return Promise.resolve('Returns as expected.');
  }

  async function throws() {
    return new Promise((resolve) => {
      throw new Error('Intentional throw.');
    });
  }

  test('await resolve() => success', async () => {
    const [data, error] = await resolve(returns());
    expect(data).toBe('Returns as expected.');
    expect(error).toBeNull();
  });

  test('await resolve() => error', async () => {
    const [data, error] = await resolve(throws());
    expect(data).toBeNull();
    expect(error).toBeDefined();
  });
});


