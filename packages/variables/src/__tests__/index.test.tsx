import { NativeModules } from 'react-native';

const nativeMock = {
  fetch: jest.fn(() => Promise.resolve()),
  getVariable: jest.fn((key: string) => key),
  trackOpen: jest.fn(),
  trackClick: jest.fn(),
  getString: (_: string, defaultValue: string) => defaultValue,
  getInteger: (_: string, defaultValue: number) => defaultValue,
  getDouble: (_: string, defaultValue: number) => defaultValue,
  getBoolean: (_: string, defaultValue: boolean) => defaultValue,
  getArray: (_: string, defaultValue: Array<any>) => defaultValue,
  getObject: (_: string, defaultValue: object) => defaultValue,
};
NativeModules.RNKRTVariablesModule = nativeMock;
const { Variables } = require('../index');

describe('Variables test', () => {
  it('fetch and track test', () => {
    Variables.fetch();
    expect(nativeMock.fetch).toBeCalled();
    Variables.trackOpen([]);
    Variables.trackOpen([], { test: 'a' });
    expect(nativeMock.trackOpen).toBeCalledTimes(2);
    Variables.trackClick([]);
    Variables.trackClick([], { test: 'a' });
    expect(nativeMock.trackClick).toBeCalledTimes(2);
  });
  it('Variable test', () => {
    const variable = Variables.getVariable('test');
    expect(variable).not.toBeNull();
    expect(variable.name).toBe('test');
    expect(variable.getString('dummy')).toBe('dummy');
    expect(variable.getInteger(5)).toBe(5);
    expect(variable.getDouble(0.5)).toBe(0.5);
    expect(variable.getBoolean(true)).toBe(true);
    expect(variable.getArray([3, 'a', null])).toStrictEqual([3, 'a', null]);
    expect(variable.getObject({ name: 'test', value: 'dummy' })).toStrictEqual({
      name: 'test',
      value: 'dummy',
    });
  });
});
