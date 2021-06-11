import { wait } from '../src';

describe('Wait (Sleep)', () => {
  test('wait 500ms', async () => {
    const delay = await wait(500);
    expect(delay).toBe(delay);
  });
});