import { NativeModules } from 'react-native';

const nativeMock = {
  registerFCMToken: jest.fn(),
  canHandle: jest.fn((data: any) => {
    if (data.krt == null) return false;
    return true;
  }),
  handle: jest.fn().mockReturnValue(true),
  show: jest.fn(),
  track: jest.fn(),
  retrieveURL: () => 'url',
};
NativeModules.RNKRTNotificationModule = nativeMock;
const { Notification } = require('../index');
const dummyRemoteMessage = { data: { krt: 'this is karte message' } };

describe('Notification test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('notification test', () => {
    const notification = Notification.create(dummyRemoteMessage);
    expect(nativeMock.canHandle).toBeCalled();
    expect(notification).not.toBeNull();
    expect(notification.handle()).toBe(true);
    expect(nativeMock.handle).toBeCalled();
    notification.show();
    expect(nativeMock.show).toBeCalled();
    notification.track();
    expect(nativeMock.track).toBeCalled();
    expect(notification.url).toBe('url');
  });
  it('create test', () => {
    expect(Notification.create({})).toBeNull();
    expect(Notification.create({ data: null })).toBeNull();
    expect(Notification.create({ data: { krt: 1 } })).not.toBeNull();
    expect(nativeMock.canHandle).toBeCalledTimes(3);
  });
  it('registerFCMToken test', () => {
    Notification.registerFCMToken('aa');
    expect(nativeMock.registerFCMToken).toBeCalled();
  });
});
