export { withBridgeInfo } from './bridge-info';

/**
 * イベントに紐付けるカスタムオブジェクトの正規化を行います。
 *
 * @param values 正規化対象のカスタムオブジェクト
 * @returns 正規化済みのカスタムオブジェクト
 */
export function normalize(values: unknown): any {
  if (Array.isArray(values) || values instanceof Set) {
    return Array.from(values).map(normalize);
  } else if (values instanceof Map) {
    const newValues: any = {};
    for (const [k, v] of values) {
      newValues[k] = normalize(v);
    }
    return newValues;
  } else if (values !== null && typeof values === 'object') {
    if (values instanceof Date) {
      const time = Math.round(values.getTime() / 1000);
      return !Number.isNaN(time) ? time : values;
    } else if (Object.prototype.toString.call(values) === '[object String]') {
      return values;
    }
    for (const k in values) {
      if (values.hasOwnProperty(k)) {
        // @ts-ignore
        values[k] = normalize(values[k]);
      }
    }
  }
  return values;
}
