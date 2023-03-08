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
    const date = new Date(1000);
    Tracker.track('aaa', {
      a: 'foo',
      b: 1,
      c: true,
      d: date,
      e: [date],
      f: { g: date },
    });
    expect(nativeMock.track).toBeCalled();
    expect(nativeMock.track.mock.calls[0][0]).toBe('aaa');
    expect(nativeMock.track.mock.calls[0][1]).toEqual({
      a: 'foo',
      b: 1,
      c: true,
      d: 1,
      e: [1],
      f: {
        g: 1,
      },
    });
  });
  it('identify test', () => {
    Tracker.identify({ user_id: 'aaa', date: new Date(1000) });
    expect(nativeMock.identify).toBeCalled();
    expect(nativeMock.identify.mock.calls[0][0]).toEqual({
      user_id: 'aaa',
      date: 1,
    });

    Tracker.identify('aaa', { date: new Date(1000) });
    expect(nativeMock.identifyWithUserId).toBeCalled();
    expect(nativeMock.identifyWithUserId.mock.calls[0][0]).toBe('aaa');
    expect(nativeMock.identifyWithUserId.mock.calls[0][1]).toEqual({ date: 1 });
  });
  it('attribute test', () => {
    Tracker.attribute({ gender: 'm', date: new Date(1000) });
    expect(nativeMock.attribute).toBeCalled();
    expect(nativeMock.attribute.mock.calls[0][0]).toEqual({
      gender: 'm',
      date: 1,
    });
  });
  it('view test', () => {
    Tracker.view('aaa', 'bbb', { date: new Date(1000) });
    expect(nativeMock.view).toBeCalled();
    expect(nativeMock.view.mock.calls[0][0]).toBe('aaa');
    expect(nativeMock.view.mock.calls[0][1]).toBe('bbb');
    expect(nativeMock.view.mock.calls[0][2]).toEqual({ date: 1 });
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
