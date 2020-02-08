'use strict'

const { loadDocumentWithURL } = require('./document-ios.js')

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
      return this.callback(urls.firstObject)
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

function chooseDocument (documentChoosen) {
  const controller = UIDocumentPickerViewController.alloc().initWithDocumentTypesInMode(
    NSArray.arrayWithArray([kUTTypeFolder, kUTTypeText]),
    UIDocumentPickerModeOpen
  )
  controller.shouldShowFileExtensions = true
  const delegate = DocumentPickerDelegate.alloc().init(url => loadDocumentWithURL(url, documentChoosen))
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

module.exports = { chooseDocument }
