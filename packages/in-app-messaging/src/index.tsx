import { NativeModules } from 'react-native';
import type { KRTInAppMessagingNativeModule } from './types';

class InAppMessagingBridge {
  constructor(private readonly nativeModule: KRTInAppMessagingNativeModule) {
    this.nativeModule = nativeModule;
  }

  public get isPresenting(): boolean {
    return this.nativeModule.isPresenting();
  }

  public dismiss(): void {
    this.nativeModule.dismiss();
  }

  public suppress(): void {
    this.nativeModule.suppress();
  }

  public unsuppress(): void {
    this.nativeModule.unsuppress();
  }
}

export const InAppMessaging = new InAppMessagingBridge(
  NativeModules.RNKRTInAppMessagingModule
);
