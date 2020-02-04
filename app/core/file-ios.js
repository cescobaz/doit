'use strict'

const DocumentPickerDelegate = NSObject.extend(
  {
    init (callback) {
      this.callback = callback
      return super.init()
    },
    documentPickerDidPickDocumentsAtURLs (controller, urls) {
      if (urls.count == 0) {
        return this.callback(null)
      }
      const url = urls.firstObject
      return this.callback({ filePath: url.absoluteString, nsURL: url })
    },
    documentPickerWasCancelled (controller) {
      this.callback(null)
    }
  },
  {
    name: 'DocumentPickerDelegate',
    protocols: [UIDocumentPickerDelegate]
  }
)

function chooseFile (callback) {
  const controller = UIDocumentPickerViewController.alloc().initWithDocumentTypesInMode(
    NSArray.arrayWithArray([kUTTypeFolder, kUTTypeText]),
    UIDocumentPickerModeOpen
  )
  controller.shouldShowFileExtensions = true
  const delegate = DocumentPickerDelegate.alloc().init(callback)
  controller.delegate = delegate
  const windows = UIApplication.sharedApplication.windows
  windows.lastObject.rootViewController.presentViewControllerAnimatedCompletion(
    controller,
    true,
    () => { console.log('presented') }
  )

  return (finished) => {
    console.log('will release')
    controller.delegate = null
    const presentingController = controller.presentingViewController
    if (!presentingController) {
      console.log('no presenting')
      finished()
      return
    }
    presentingController.dismissViewControllerAnimatedCompletion(true, finished)
  }
}

module.exports = { chooseFile }
