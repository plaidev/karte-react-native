import { NativeModules } from 'react-native';

let optout = false;
let visitorId = 'dummy';
const nativeMock = {
  getVisitorId: () => visitorId,
  isOptOut: () => optout,
  optIn: () => {
    optout = true;
  },
  optOut: () => {
    optout = false;
  },
  renewVisitorId: () => {
    visitorId = 'renewed';
  },
  track: jest.fn(),
  identify: jest.fn(),
  view: jest.fn(),
  appendingUserSyncQueryParameter: (url: string) => `${url}?appended=true`,
};
NativeModules.RNKRTCoreModule = nativeMock;
const { KarteApp, Tracker, UserSync } = require('../index');

describe('KarteApp test', () => {
  it('outout test', () => {
    expect(KarteApp.isOptOut).toBe(false);
    KarteApp.optIn();
    expect(KarteApp.isOptOut).toBe(true);
    KarteApp.optOut();
    expect(KarteApp.isOptOut).toBe(false);
  });
  it('visitorId test', () => {
    expect(KarteApp.visitorId).toBe('dummy');
    KarteApp.renewVisitorId();
    expect(KarteApp.visitorId).toBe('renewed');
  });
});
test('Tracker test', () => {
  Tracker.track('aaa');
  expect(nativeMock.track).toBeCalled();
});
test('UserSync test', () => {
  const url = 'https://example.com';
  expect(UserSync.appendingQueryParameter(url)).toBe(
    'https://example.com?appended=true'
  );
});
