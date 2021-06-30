import { NativeModules } from 'react-native';

const nativeMock = {
  view: jest.fn(),
};
NativeModules.RNKRTVisualTrackingModule = nativeMock;
const { VisualTracking } = require('../index');

test('VisualTracking test', () => {
  VisualTracking.view('action', 'actionId', 'targetText');
  expect(nativeMock.view).toBeCalled();
});
