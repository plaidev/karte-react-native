import { NativeModules } from 'react-native';

const nativeMock = {
  isPresenting: () => true,
  dismiss: jest.fn(),
  suppress: jest.fn(),
  unsuppress: jest.fn(),
};
NativeModules.RNKRTInAppMessagingModule = nativeMock;
const { InAppMessaging } = require('../index');

test('InAppMessaging test', () => {
  expect(InAppMessaging.isPresenting).toBe(true);
  InAppMessaging.dismiss();
  expect(nativeMock.dismiss).toBeCalled();
  InAppMessaging.suppress();
  expect(nativeMock.suppress).toBeCalled();
  InAppMessaging.unsuppress();
  expect(nativeMock.unsuppress).toBeCalled();
});
