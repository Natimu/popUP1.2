//
//  SharedStorageModule.swift
//  popUP
//
//  Created by natnael awoke on 11/21/25.
//
import Foundation
import WidgetKit

@objc(SharedStorageModule)
class SharedStorageModule: NSObject {

    private let appGroupID = "group.com.nati04.popUP"

    private func containerURL() -> URL? {
        return FileManager.default.containerURL(
            forSecurityApplicationGroupIdentifier: appGroupID
        )
    }

    // MARK: - Save only selected folder's quotes
    @objc
    func saveWidgetQuotes(_ quotesJSON: NSString,
                          resolve: @escaping RCTPromiseResolveBlock,
                          reject: @escaping RCTPromiseRejectBlock) {

        guard let container = containerURL() else {
            reject("no_container", "Shared container not found", nil)
            return
        }

        let fileURL = container.appendingPathComponent("widget_quotes.json")

        do {
            try quotesJSON.write(
                to: fileURL,
                atomically: true,
                encoding: String.Encoding.utf8.rawValue
            )
            WidgetCenter.shared.reloadAllTimelines()
            resolve("widget_quotes_saved")
        } catch {
            reject("write_error", "Failed to write widget_quotes.json", error)
        }
    }

    // MARK: - Save widget settings (folder + interval)
    @objc
    func saveWidgetSettings(_ json: NSString,
                            resolve: @escaping RCTPromiseResolveBlock,
                            reject: @escaping RCTPromiseRejectBlock) {

        guard let container = containerURL() else {
            reject("no_container", "Shared container not found", nil)
            return
        }

        let fileURL = container.appendingPathComponent("widgetSettings.json")

        do {
            try json.write(
                to: fileURL,
                atomically: true,
                encoding: String.Encoding.utf8.rawValue
            )
            WidgetCenter.shared.reloadAllTimelines()
            resolve("widget_settings_saved")
        } catch {
            reject("write_error", "Failed to write widgetSettings.json", error)
        }
      print("Container URL:", FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: appGroupID))

    }
  
  
}
