// Mock withBridgeInfo to avoid React Native bridge initialization issues in tests
jest.mock('@react-native-karte/utilities', () => {
  const actual = jest.requireActual('@react-native-karte/utilities');
  return {
    ...actual,
    withBridgeInfo: (values?: Record<string, any>) => {
      const normalizedValues = values ?? {};
      if ('bridge_info' in normalizedValues) {
        return normalizedValues;
      }
      return {
        ...normalizedValues,
        bridge_info: {
          react_native_version: '0.72.4',
          new_arch: false,
        },
      };
    },
  };
});

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
    Tracker.track('aaa', { date: new Date(1000) });
    expect(nativeMock.track).toBeCalled();
    expect(nativeMock.track.mock.calls[0][0]).toBe('aaa');
    expect(nativeMock.track.mock.calls[0][1]).toEqual({
      date: 1,
      bridge_info: {
        react_native_version: '0.72.4',
        new_arch: false,
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
    expect(nativeMock.identifyWithUserId.mock.calls[0][1]).toEqual({
      date: 1,
    });
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
    expect(nativeMock.view.mock.calls[0][2]).toEqual({
      date: 1,
      bridge_info: {
        react_native_version: '0.72.4',
        new_arch: false,
      },
    });
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
