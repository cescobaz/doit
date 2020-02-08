const TodoTXT = require('./todotxt')

const Document = UIDocument.extend({
  initWithFileURL (url) {
    console.log('initWithFileURL', url, this, this.super)
    this.todotxt = new TodoTXT()
    return super.initWithFileURL(url)
  },
  contentsForType (type) {
    console.log('contentsForType', type)
    return 'ciao contenturto file'.dataUsingEncoding(NSUTF8StringEncoding)
  },
  loadFromContentsOfTypeError (contents, typeName) {
    const stringContent = NSString.alloc().initWithDataEncoding(contents, NSUTF8StringEncoding).toString()
    const tasks = this.todotxt.parse(stringContent)
    this.tasks = tasks
    return true
  }
}, {
  name: 'Document'
})

const todotxtBookmarkDataKey = 'todotxtBookmarkData'
function storeBookmark (url) {
  const data = url.bookmarkDataWithOptionsIncludingResourceValuesForKeysRelativeToURLError(
    NSURLBookmarkCreationOptions.NSURLBookmarkCreationWithSecurityScope, [], null)
  NSUserDefaults.standardUserDefaults.setObjectForKey(data, todotxtBookmarkDataKey)
}

function loadBookmark () {
  const data = NSUserDefaults.standardUserDefaults.dataForKey(todotxtBookmarkDataKey)
  return NSURL.URLByResolvingBookmarkDataOptionsRelativeToURLBookmarkDataIsStaleError(bookmarkData, options, relativeURL, isStale)
}

function loadDocument (documentLoaded) {
  const url = loadBookmark()
  loadDocumentWithURL(url)
}

function loadDocumentWithURL (url, documentLoaded) {
  if (!url) {
    documentLoaded(null)
  }
  const document = Document.alloc().initWithFileURL(url)
  document.openWithCompletionHandler(success => {
    console.log('openWithCompletionHandler', success, document.tasks)
    if (!success) {
      documentLoaded(null)
    }
    storeBookmark(url)
    documentLoaded(document)
  })
}

module.exports = { loadDocumentWithURL, loadDocument }
