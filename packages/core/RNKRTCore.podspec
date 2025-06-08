require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNKRTCore"
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

  s.dependency "KarteCore", '~> 2'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES'
  }

  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
    if ENV['RCT_NEW_ARCH_ENABLED'] == '1' then
      s.pod_target_xcconfig = {
        'DEFINES_MODULE' => 'YES',
        'GCC_PREPROCESSOR_DEFINITIONS' => '$(inherited) COCOAPODS=1 RCT_NEW_ARCH_ENABLED=1',
        "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\" \"${PODS_ROOT}/Headers/Private/Yoga\"",
        "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
      }
    end
  end
end
