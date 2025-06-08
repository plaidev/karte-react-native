require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

# Check if new architecture is enabled
new_arch_enabled = ENV['RCT_NEW_ARCH_ENABLED'] == '1'

Pod::Spec.new do |s|
  s.name         = "RNKRTVisualTracking"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/plaidev/karte-react-native.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"

  s.swift_versions = [5.1]
  s.static_framework = true

  if new_arch_enabled
    s.dependency "React-Codegen"
    s.dependency "RCT-Folly"
    s.dependency "RCTRequired"
    s.dependency "RCTTypeSafety"
    s.dependency "ReactCommon/turbomodule/core"
  else
    s.dependency "React"
  end
  
  s.dependency "RNKRTCore"
  s.dependency "KarteVisualTracking", '~> 2'
end
