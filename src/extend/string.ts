export { };

/****************
 * DECLARATIONS *
 ****************/

declare global {
  interface String {
    format(...args: any[]): string;
  }

  interface StringConstructor {
    format(str: string, ...args: any[]): string;
    /**
     * Returns an empty string in case param doesn't possess toString() method.
     * @param data anything.
     */
    value(data: any): string;
  }
}

/***************
 * DEFINITIONS *
 ***************/

String.prototype.format = function (...args: any[]) {
  return this.replace(/{(\d+)}/g, (match: string, index: number) => {
    return (
      typeof args[index] !== undefined
        && args[index] !== null
        && args[index].toString
        ? args[index]
        : match
    );
  });
};

String.format = function (str: string, ...args: string[]) {
  return str.format(...args);
};

String.value = function (data: any) {
  if (data === undefined || data === null) {
    return "";
  }
  if (typeof data === 'object') {
    return JSON.stringify(data);
  }
  if (data.toString) {
    return data.toString();
  }

  return "";
};