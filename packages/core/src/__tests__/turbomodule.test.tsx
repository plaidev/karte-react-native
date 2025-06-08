import { NativeModules } from 'react-native';

describe('TurboModule support tests', () => {
  const originalTurboModuleProxy = global.__turboModuleProxy;
  let mockTurboModule: any;
  let mockNativeModule: any;

  beforeEach(() => {
    // Clear module cache
    jest.resetModules();

    // Setup mocks
    mockTurboModule = {
      getVisitorId: jest.fn(() => 'turbo-visitor-id'),
      isOptOut: jest.fn(() => false),
      optIn: jest.fn(),
      optOut: jest.fn(),
      renewVisitorId: jest.fn(),
      track: jest.fn(),
      identify: jest.fn(),
      identifyWithUserId: jest.fn(),
      attribute: jest.fn(),
      view: jest.fn(),
      appendingUserSyncQueryParameter: jest.fn(
        (url: string) => `${url}?turbo=true`
      ),
      getUserSyncScript: jest.fn(() => 'turbo-script'),
    };

    mockNativeModule = {
      getVisitorId: jest.fn(() => 'native-visitor-id'),
      isOptOut: jest.fn(() => true),
      optIn: jest.fn(),
      optOut: jest.fn(),
      renewVisitorId: jest.fn(),
      track: jest.fn(),
      identify: jest.fn(),
      identifyWithUserId: jest.fn(),
      attribute: jest.fn(),
      view: jest.fn(),
      appendingUserSyncQueryParameter: jest.fn(
        (url: string) => `${url}?native=true`
      ),
      getUserSyncScript: jest.fn(() => 'native-script'),
    };

    // Mock NativeModules
    NativeModules.RNKRTCoreModule = mockNativeModule;
  });

  afterEach(() => {
    // Restore original turboModuleProxy
    global.__turboModuleProxy = originalTurboModuleProxy;
  });

  describe('when TurboModule is enabled', () => {
    beforeEach(() => {
      // Enable TurboModule
      global.__turboModuleProxy = {};

      // Mock the TurboModule require
      jest.doMock('../NativeRNKRTCoreModule', () => ({
        default: mockTurboModule,
      }));
    });

    it('should use TurboModule when available', () => {
      const { KarteApp } = require('../index');

      expect(KarteApp.visitorId).toBe('turbo-visitor-id');
      expect(mockTurboModule.getVisitorId).toHaveBeenCalled();
      expect(mockNativeModule.getVisitorId).not.toHaveBeenCalled();
    });

    it('should use TurboModule for all KarteApp methods', () => {
      const { KarteApp } = require('../index');

      expect(KarteApp.isOptOut).toBe(false);
      KarteApp.optIn();
      KarteApp.optOut();
      KarteApp.renewVisitorId();

      expect(mockTurboModule.isOptOut).toHaveBeenCalled();
      expect(mockTurboModule.optIn).toHaveBeenCalled();
      expect(mockTurboModule.optOut).toHaveBeenCalled();
      expect(mockTurboModule.renewVisitorId).toHaveBeenCalled();

      // Ensure native module was not called
      expect(mockNativeModule.isOptOut).not.toHaveBeenCalled();
      expect(mockNativeModule.optIn).not.toHaveBeenCalled();
      expect(mockNativeModule.optOut).not.toHaveBeenCalled();
      expect(mockNativeModule.renewVisitorId).not.toHaveBeenCalled();
    });

    it('should use TurboModule for Tracker methods', () => {
      const { Tracker } = require('../index');

      Tracker.track('test_event', { key: 'value' });
      Tracker.identify({ user_id: 'test_user' });
      Tracker.identify('test_user_id', { name: 'Test User' });
      Tracker.attribute({ age: 25 });
      Tracker.view('test_view', 'Test Title', { screen: 'home' });

      expect(mockTurboModule.track).toHaveBeenCalledWith('test_event', {
        key: 'value',
      });
      expect(mockTurboModule.identify).toHaveBeenCalledWith({
        user_id: 'test_user',
      });
      expect(mockTurboModule.identifyWithUserId).toHaveBeenCalledWith(
        'test_user_id',
        { name: 'Test User' }
      );
      expect(mockTurboModule.attribute).toHaveBeenCalledWith({ age: 25 });
      expect(mockTurboModule.view).toHaveBeenCalledWith(
        'test_view',
        'Test Title',
        { screen: 'home' }
      );

      // Ensure native module was not called
      expect(mockNativeModule.track).not.toHaveBeenCalled();
      expect(mockNativeModule.identify).not.toHaveBeenCalled();
      expect(mockNativeModule.identifyWithUserId).not.toHaveBeenCalled();
      expect(mockNativeModule.attribute).not.toHaveBeenCalled();
      expect(mockNativeModule.view).not.toHaveBeenCalled();
    });

    it('should use TurboModule for UserSync methods', () => {
      const { UserSync } = require('../index');

      const url = 'https://example.com';
      const appendedUrl = UserSync.appendingQueryParameter(url);
      const script = UserSync.getUserSyncScript();

      expect(appendedUrl).toBe('https://example.com?turbo=true');
      expect(script).toBe('turbo-script');
      expect(
        mockTurboModule.appendingUserSyncQueryParameter
      ).toHaveBeenCalledWith(url);
      expect(mockTurboModule.getUserSyncScript).toHaveBeenCalled();

      // Ensure native module was not called
      expect(
        mockNativeModule.appendingUserSyncQueryParameter
      ).not.toHaveBeenCalled();
      expect(mockNativeModule.getUserSyncScript).not.toHaveBeenCalled();
    });
  });

  describe('when TurboModule is not available', () => {
    beforeEach(() => {
      // Disable TurboModule
      global.__turboModuleProxy = undefined;
    });

    it('should fall back to NativeModules when TurboModule is not available', () => {
      const { KarteApp } = require('../index');

      expect(KarteApp.visitorId).toBe('native-visitor-id');
      expect(mockNativeModule.getVisitorId).toHaveBeenCalled();
      expect(mockTurboModule.getVisitorId).not.toHaveBeenCalled();
    });

    it('should use NativeModules for all KarteApp methods', () => {
      const { KarteApp } = require('../index');

      expect(KarteApp.isOptOut).toBe(true);
      KarteApp.optIn();
      KarteApp.optOut();
      KarteApp.renewVisitorId();

      expect(mockNativeModule.isOptOut).toHaveBeenCalled();
      expect(mockNativeModule.optIn).toHaveBeenCalled();
      expect(mockNativeModule.optOut).toHaveBeenCalled();
      expect(mockNativeModule.renewVisitorId).toHaveBeenCalled();
    });

    it('should use NativeModules for Tracker methods', () => {
      const { Tracker } = require('../index');

      Tracker.track('test_event', { key: 'value' });
      Tracker.identify({ user_id: 'test_user' });
      Tracker.identify('test_user_id', { name: 'Test User' });
      Tracker.attribute({ age: 25 });
      Tracker.view('test_view', 'Test Title', { screen: 'home' });

      expect(mockNativeModule.track).toHaveBeenCalledWith('test_event', {
        key: 'value',
      });
      expect(mockNativeModule.identify).toHaveBeenCalledWith({
        user_id: 'test_user',
      });
      expect(mockNativeModule.identifyWithUserId).toHaveBeenCalledWith(
        'test_user_id',
        { name: 'Test User' }
      );
      expect(mockNativeModule.attribute).toHaveBeenCalledWith({ age: 25 });
      expect(mockNativeModule.view).toHaveBeenCalledWith(
        'test_view',
        'Test Title',
        { screen: 'home' }
      );
    });

    it('should use NativeModules for UserSync methods', () => {
      const { UserSync } = require('../index');

      const url = 'https://example.com';
      const appendedUrl = UserSync.appendingQueryParameter(url);
      const script = UserSync.getUserSyncScript();

      expect(appendedUrl).toBe('https://example.com?native=true');
      expect(script).toBe('native-script');
      expect(
        mockNativeModule.appendingUserSyncQueryParameter
      ).toHaveBeenCalledWith(url);
      expect(mockNativeModule.getUserSyncScript).toHaveBeenCalled();
    });
  });

  describe('date normalization with TurboModule', () => {
    beforeEach(() => {
      // Enable TurboModule
      global.__turboModuleProxy = {};

      // Mock the TurboModule require
      jest.doMock('../NativeRNKRTCoreModule', () => ({
        default: mockTurboModule,
      }));
    });

    it('should normalize Date objects in track events', () => {
      const { Tracker } = require('../index');
      const testDate = new Date(1000);

      Tracker.track('test_event', { date: testDate });

      expect(mockTurboModule.track).toHaveBeenCalledWith('test_event', {
        date: 1,
      });
    });

    it('should normalize Date objects in identify events', () => {
      const { Tracker } = require('../index');
      const testDate = new Date(2000);

      Tracker.identify({ user_id: 'test', created_at: testDate });
      Tracker.identify('test_id', { updated_at: testDate });

      expect(mockTurboModule.identify).toHaveBeenCalledWith({
        user_id: 'test',
        created_at: 2,
      });
      expect(mockTurboModule.identifyWithUserId).toHaveBeenCalledWith(
        'test_id',
        { updated_at: 2 }
      );
    });
  });
});
