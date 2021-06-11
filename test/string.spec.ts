import '../src/extend/string';
import { performance } from 'perf_hooks';

describe('String', () => {
  test('String.prototype.format()', () => {
    const str = '{0}/{1}'.format('banana', 7);
    expect(str).toBe('banana/7');
  });

  test('String.format()', () => {
    const str = String.format('{0}/{1}', 'banana', 7);
    expect(str).toBe('banana/7');
  });

  test('String.value(), valid arguments', () => {
    expect(String.value('string')).toBe('string');
    expect(String.value({ a: 1, b: 2 })).toBe('{"a":1,"b":2}');
  });

  test('String.value(), invalid arguments', () => {
    expect(String.value(null)).toBe('');
    expect(String.value(undefined)).toBe('');
  });
});

describe('String Benchmark', () => {
  async function benchmark<T>(promise: Promise<T>, iterations: number) {
    const before = performance.now();
    for (let i = 0; i < iterations; i++) {
      await promise.finally(() => { /* no action. */ });
    }
    const after = performance.now();
    return after - before;
  }

  function format(arg: any) {
    return Promise.resolve('{0}'.format(arg));
  };

  function literal(arg: any) {
    return Promise.resolve(`${arg}`);
  };

  test('String.format() Benchmark', async () => {
    const iterations = 10000000; // 10 million
    const timeFormat = await benchmark(format(1), iterations);
    const timeTemplates = await benchmark(literal(1), iterations);

    console.info(
      `${iterations.toLocaleString()} iterations.\n`,
      'String.format() :: {0}\n'.format(timeFormat.toFixed(6)),
      'Template literals :: {0}'.format(timeTemplates.toFixed(6))
    );

    expect(timeFormat).toBeLessThan(timeTemplates);
  });
});
