export interface KRTCoreNativeModule {
  getVisitorId(): string;
  isOptOut(): boolean;
  optIn(): void;
  optOut(): void;
  renewVisitorId(): void;
  track(name: string, values?: object): void;
  identify(values: object): void;
  view(viewName: string, title?: string, values?: object): void;
  appendingUserSyncQueryParameter(url: string): string;
}
