//
//  Copyright 2020 PLAID, Inc.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      https://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
//

import { NativeModules } from 'react-native';
import type { KRTVariablesNativeModule } from './types';

class VariablesBridge {
  constructor(private readonly nativeModule: KRTVariablesNativeModule) {}

  public fetch(): Promise<void> {
    return this.nativeModule.fetch();
  }

  public getVariable(key: string): Variable {
    const name = this.nativeModule.getVariable(key);
    return new Variable(this.nativeModule, name);
  }

  public trackOpen(variables: Array<Variable>, values?: object): void {
    const keys = variables.map((variable) => variable.name);
    this.nativeModule.trackOpen(keys, values);
  }

  public trackClick(variables: Array<Variable>, values?: object): void {
    const keys = variables.map((variable) => variable.name);
    this.nativeModule.trackClick(keys, values);
  }
}

class Variable {
  public constructor(
    private readonly nativeModule: KRTVariablesNativeModule,
    public name: string
  ) {}

  public getString(defaultValue: string): string {
    return this.nativeModule.getString(this.name, defaultValue);
  }

  public getInteger(defaultValue: number): number {
    return this.nativeModule.getInteger(this.name, defaultValue);
  }

  public getDouble(defaultValue: number): number {
    return this.nativeModule.getDouble(this.name, defaultValue);
  }

  public getBoolean(defaultValue: boolean): boolean {
    return this.nativeModule.getBoolean(this.name, defaultValue);
  }

  public getArray(defaultValue: Array<any>): Array<any> {
    return this.nativeModule.getArray(this.name, defaultValue);
  }

  public getObject(defaultValue: object): object {
    return this.nativeModule.getObject(this.name, defaultValue);
  }
}

export const Variables = new VariablesBridge(
  NativeModules.RNKRTVariablesModule
);
