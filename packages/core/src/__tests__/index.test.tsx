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
  identifyWithUserId: jest.fn(),
  attribute: jest.fn(),
  view: jest.fn(),
  appendingUserSyncQueryParameter: (url: string) => `${url}?appended=true`,
  getUserSyncScript: () => 'window.__karte_ntvsync = {};',
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
describe('Tracker test', () => {
  it('track test', () => {
    Tracker.track('aaa');
    expect(nativeMock.track).toBeCalled();
  });
  it('identify test', () => {
    Tracker.identify({ user_id: 'aaa' });
    expect(nativeMock.identify).toBeCalled();
    Tracker.identify('aaa');
    expect(nativeMock.identifyWithUserId).toBeCalled();
  });
  it('attribute test', () => {
    Tracker.attribute({ gender: 'm' });
    expect(nativeMock.attribute).toBeCalled();
  });
  it('view test', () => {
    Tracker.view('aaa');
    expect(nativeMock.view).toBeCalled();
  });
});
describe('UserSync test', () => {
  it('append param test', () => {
    const url = 'https://example.com';
    expect(UserSync.appendingQueryParameter(url)).toBe(
      'https://example.com?appended=true'
    );
  });
  it('get script test', () => {
    expect(UserSync.getUserSyncScript()).toBe('window.__karte_ntvsync = {};');
  });
});
