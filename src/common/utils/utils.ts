type FieldType = 'CURRENCY' | 'STRING' | 'DOUBLE' | 'PHONE' | 'DATE' | 'BOOLEAN' | 'EMAIL' | 'DATETIME';

export default class Utils {
  static chunk(arr: Array<any>, chunkSize: number) {
    const smallArr = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      smallArr.push(arr.slice(i, i + chunkSize));
    }
    return smallArr;
  }

  static getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous.toLocaleDateString();
  }

  static getToday() {
    return new Date().toLocaleDateString();
  }

  static isUndefined = (obj: any): obj is undefined => typeof obj === 'undefined';

  static isObject = (fn: any): fn is object => !Utils.isNil(fn) && typeof fn === 'object';

  static isPlainObject = (fn: any): fn is object => {
    if (!Utils.isObject(fn)) {
      return false;
    }
    const proto = Object.getPrototypeOf(fn);
    if (proto === null) {
      return true;
    }
    const ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return (
      typeof ctor === 'function' &&
      ctor instanceof ctor &&
      Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object)
    );
  };

  static addLeadingSlash = (path?: string): string =>
    path && typeof path === 'string' ? (path.charAt(0) !== '/' ? '/' + path : path) : '';

  static normalizePath = (path?: string): string =>
    path ? (path.startsWith('/') ? ('/' + path.replace(/\/+$/, '')).replace(/\/+/g, '/') : '/' + path.replace(/\/+$/, '')) : '/';

  static stripEndSlash = (path: string) => (path[path.length - 1] === '/' ? path.slice(0, path.length - 1) : path);

  static isFunction = (val: any): boolean => typeof val === 'function';

  static isString = (val: any): val is string => typeof val === 'string';

  static isNumber = (val: any): val is number => typeof val === 'number';

  static isConstructor = (val: any): boolean => val === 'constructor';

  static isNil = (val: any): val is null | undefined => Utils.isUndefined(val) || val === null;

  static isEmpty = (array: any): boolean => !(array && array.length > 0);

  static isSymbol = (val: any): val is symbol => typeof val === 'symbol';
}
