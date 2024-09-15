import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(VideoPickerPlugin)
public class VideoPickerPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "VideoPickerPlugin"
    public let jsName = "VideoPicker"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "pick", returnType: CAPPluginReturnPromise)
    ]
    private var savedCall: CAPPluginCall?

    @objc func pick(_ call: CAPPluginCall) {
        savedCall = call

        DispatchQueue.main.async {
            let videoPicker = UIImagePickerController()
            videoPicker.delegate = self
            videoPicker.sourceType = .photoLibrary
            videoPicker.modalPresentationStyle = .fullScreen
            videoPicker.mediaTypes = ["public.movie"]

            self.bridge?.viewController?.present(videoPicker, animated: true)
        }

    }
}

extension VideoPickerPlugin: UIImagePickerControllerDelegate {
    public func imagePickerController(_ controller: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]) {
        guard
            let mediaUrl = info[.mediaURL] as? URL
        else {
            savedCall?.reject("Cannot get video URL")
            return
        }

        var url: URL
        do {
            url = try saveTemporaryVideo(mediaUrl)
        } catch {
            savedCall?.reject("Cannot save video")
            return
        }

        var files = [JSObject]()
        var file = JSObject()

        file["path"] = url.absoluteString
        file["webPath"] = self.bridge?.portablePath(fromLocalURL: url)?.absoluteString
        file["name"] = url.lastPathComponent
        file["extension"] = url.pathExtension

        files.append(file)

        controller.dismiss(animated: true) {
            self.savedCall?.resolve([
                "files": files
            ])
        }
    }

    public func imagePickerControllerDidCancel(_ controller: UIImagePickerController) {
        controller.dismiss(animated: true) {
            self.savedCall?.reject("canceled")
        }
    }

    func saveTemporaryVideo(_ mediaUrl: URL) throws -> URL {
        let url = URL(fileURLWithPath: NSTemporaryDirectory())
            .appendingPathComponent(mediaUrl.lastPathComponent)

        try FileManager.default.copyItem(at: mediaUrl, to: url)

        return url
    }
}

extension VideoPickerPlugin: UINavigationControllerDelegate {

}
