export async function resolve<T>(promise: Promise<T>, debug?: false) {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    if (debug) {
      console.error(error);
    }
    return [null, error];
  }
}