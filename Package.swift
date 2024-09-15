// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorPluginVideoPicker",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "CapacitorPluginVideoPicker",
            targets: ["VideoPickerPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "main")
    ],
    targets: [
        .target(
            name: "VideoPickerPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/VideoPickerPlugin"),
        .testTarget(
            name: "VideoPickerPluginTests",
            dependencies: ["VideoPickerPlugin"],
            path: "ios/Tests/VideoPickerPluginTests")
    ]
)
