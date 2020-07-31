export interface KRTInAppMessagingNativeModule {
  isPresenting(): boolean;
  dismiss(): void;
  suppress(): void;
  unsuppress(): void;
}
