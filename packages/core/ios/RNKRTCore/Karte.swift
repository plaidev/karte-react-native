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
