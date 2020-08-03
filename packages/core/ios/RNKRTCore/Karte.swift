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

import KarteCore

class Karte {
}

extension Karte: Library {
    static var name: String {
        "react-native"
    }
    
    static var version: String {
        RNKRTVersionString
    }
    
    static var isPublic: Bool {
        true
    }
    
    static func configure(app: KarteApp) {
    }
    
    static func unconfigure(app: KarteApp) {
    }
}

extension RNKRTLoader {
    open override class func handleLoad() {
        KarteApp.register(library: Karte.self)
    }
}
